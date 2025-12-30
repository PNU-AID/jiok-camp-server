'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './Camp1Test.module.css';
import {
  getReview,
  getReviewById,
  postReview,
} from '@/hooks/apis/camp1/review';
import { getCheckById } from '@/hooks/apis/camp1/check';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

type ReviewWithMy = Review & { isMyReview?: boolean; userRatings?: number };

const Camp1Test = () => {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');

  const LOCALSTORAGE_KEY = 'myReview';
  const [reviews, setReviews] = useState<ReviewWithMy[]>([]);
  const [inputText, setInputText] = useState(''); // 입력한 텍스트 상태 관리
  const [isRating, setIsRating] = useState(false); // 별점 선택 UI 상태 관리
  const [currentPage, setCurrentPage] = useState(1); // 기본값 1
  const pageSize = 30; // 한 페이지에 보여줄 리뷰 수
  const [showOverlay, setShowOverlay] = useState(false); // 오버레이 상태 관리
  const [activeReviewId, setActiveReviewId] = useState<number | null>(null); // 현재 별점을 선택 중인 리뷰 ID
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const [maxPage, setMaxPage] = useState(1); // 최대 페이지 상태 관리
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const scrollContainerRef = useRef<HTMLDivElement>(null); // 스크롤 컨테이너 참조
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const loadInitialReviews = async () => {
      const newMaxPage = await getMaxPage(pageSize);
      setMaxPage(newMaxPage);
      setCurrentPage(newMaxPage);
      const fetchedData = await fetchReviews(newMaxPage, pageSize);
      setReviews(fetchedData);
      // console.log('inited');
    };

    loadInitialReviews();
  }, []);

  useEffect(() => {
    // 첫 로딩에 받아온 리뷰가 화면을 꽉 채우지 않으면 다음 페이지 로딩 진행
    if (
      scrollContainerRef.current &&
      maxPage === currentPage &&
      1 < currentPage &&
      reviews.length &&
      !loading
    ) {
      const container = scrollContainerRef.current;
      if ((container.scrollHeight, container.clientHeight)) {
        fetchNextPage();
      }
    }

    // 첫 로딩 또는 새 리뷰가 추가되면 스크롤을 맨 아래로 이동
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollTop = container.scrollHeight - container.clientHeight;
    }
  }, [reviews]);

  const fetchNextPage = async () => {
    // console.log('Fetching previous page data...');
    setLoading(true);
    const newPage = currentPage - 1;
    const fetchedData = await fetchReviews(newPage, pageSize); // 이전 페이지 데이터 추가
    setReviews((prevReviews) => [...fetchedData, ...prevReviews]);
    setCurrentPage(newPage);
    // console.log("Page decremented to:", newPage);
    setLoading(false);
  };

  const handleScroll = async () => {
    if (!scrollContainerRef.current || loading) {
      // console.log("Scroll handler skipped. Either no ref or loading.");
      return;
    }

    const {
      scrollTop,
      // scrollHeight,
      // clientHeight
    } = scrollContainerRef.current;

    // 현재 스크롤 상태를 출력
    // console.log("Scroll Top:", scrollTop);
    // console.log("Scroll Height:", scrollHeight);
    // console.log("Client Height:", clientHeight);

    // 스크롤이 상단에 도달하면 이전 페이지 데이터 로드
    if (scrollTop <= 150 && 1 < currentPage) {
      fetchNextPage();
    } else {
      // console.log("No action taken.");
    }
  };

  const getMaxPage = async (size: number) => {
    if (size <= 0) {
      throw Error('size는 1 이상의 값이어야 합니다.');
    }

    const data = await getReview({ page: 1, size });

    if (!data) throw new Error(`No received data`);

    return data.pageinfo;
  };

  const fetchReviews = async (page: number, size: number) => {
    try {
      const validPage = page > 0 ? page : 1;
      const validSize = size > 0 ? size : pageSize; // 기본값은 pageSize

      const data = await getReview({ page: validPage, size: validSize });

      if (!data) throw new Error('No received data');

      const myReviews = new Set(
        JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) ?? '[]'),
      );
      const fetchedData = data.reviews.map((review) => ({
        ...review,
        isMyReview: myReviews.has(review.id),
      }));

      // 새 리뷰를 상단에 추가
      // console.log('fetchReviews', page);
      return fetchedData;
    } catch (error) {
      console.error('리뷰 데이터를 가져오는 중 오류', error);
      return [];
    }
  };

  const handleReviewSubmit = () => {
    if (inputText.trim() === '') {
      console.error('리뷰 내용을 입력하세요.');
      return;
    }

    // 리뷰 내용을 임시로 저장하고 별점 입력 UI 활성화
    const tempReview: ReviewWithMy = {
      id: Date.now(), // 임시 ID
      reviewContents: inputText.trim(),
      userRatings: undefined, // 별점은 아직 선택되지 않음
      modelRatings: 0, // 모델 별점 초기화
      isMyReview: true,
    };

    setReviews((prevReviews) => [...prevReviews, tempReview]);
    setInputText(''); // 입력 필드 초기화
    setIsRating(true); // 별점 입력 활성화
    setActiveReviewId(tempReview.id); // 별점 선택 중인 리뷰 ID 저장
  };

  const handleRatingSubmit = async (rating: number) => {
    if (!activeReviewId || rating === null) {
      console.error('별점을 선택하세요.');
      return;
    }

    setIsRating(false); // 별점 입력 UI 비활성화
    setShowOverlay(false); // 오버레이 숨기기
    setLoading(true); // 로딩 상태 활성화

    // 리뷰 데이터 업데이트
    const updatedReviews = reviews.map((review) =>
      review.id === activeReviewId
        ? { ...review, userRatings: rating }
        : review,
    );
    setReviews(updatedReviews);

    // 서버에 리뷰 전송
    const reviewToSubmit = updatedReviews.find(
      (review) => review.id === activeReviewId,
    );

    if (!reviewToSubmit) {
      console.error('리뷰를 찾을 수 없습니다.');
      setLoading(false);
      return;
    }

    try {
      const newReview = await postReview({
        reviewContents: reviewToSubmit.reviewContents,
        userRatings: rating,
      });

      if (!newReview) {
        console.error('리뷰 등록 실패');
        setLoading(false);
        return;
      }

      // 리뷰 데이터 업데이트
      const updatedReviews = reviews.map((review) =>
        review.id === activeReviewId ? { ...review, id: newReview.id } : review,
      );
      setReviews(updatedReviews);
      const storage = localStorage.getItem(LOCALSTORAGE_KEY);
      if (storage) {
        const myReviews = new Set(JSON.parse(storage));
        myReviews.add(newReview.id);
        localStorage.setItem(
          LOCALSTORAGE_KEY,
          JSON.stringify(Array.from(myReviews)),
        );
      } else {
        const myReviews = new Set([newReview.id]);
        localStorage.setItem(
          LOCALSTORAGE_KEY,
          JSON.stringify(Array.from(myReviews)),
        );
      }

      // 상태 확인 함수
      const checkStatusAndFetchResult = async () => {
        try {
          const status = await getCheckById(newReview.id);

          if (!status) throw new Error(`No received data`);

          if (status.status) {
            // 상태가 완료되면 결과 가져오기
            const result = await getReviewById(newReview.id);

            if (!result) throw new Error(`No received data`);

            setReviews((prevReviews) =>
              prevReviews.map((review) => {
                return review.id === newReview.id
                  ? { ...review, modelRatings: result.modelRatings }
                  : review;
              }),
            );
            // console.log(
            //   `AI 예측 별점: ${result.modelRatings} (ID: ${newReview.id})`
            // );
            setLoading(false); // 로딩 상태 비활성화
          } else {
            // console.log("예측 진행 중... 2초 후 다시 확인합니다.");
            setTimeout(checkStatusAndFetchResult, 2000); // 2초 후 재확인
          }
        } catch (error) {
          console.error('예측 상태 확인 중 에러:', error);
          setLoading(false);
        }
      };

      // 상태 확인 시작
      checkStatusAndFetchResult();
    } catch (error) {
      console.error('예측 상태 확인 중 에러:', error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.description_box}>
        {lang !== null ? (
          lang === 'EN' ? (
            <>
              <div className={styles.semi_content}>
                Write a review in <strong>English</strong> about the most recent
                McDonald’s you visited!
              </div>
              <div className={styles.semi_content_2}>
                The AI will predict the star rating you would give.
              </div>
            </>
          ) : (
            <>
              <div className={styles.semi_content}>
                가장 최근에 다녀왔던 맥도날드의 리뷰를 <strong>영어</strong>로
                남겨보세요!
              </div>
              <div className={styles.semi_content_2}>
                AI가 당신이 남길 별점을 예측해드립니다.
              </div>
            </>
          )
        ) : (
          <></>
        )}
        <div className={styles.rectangle} />
      </div>

      <div
        className={styles.all_chatting_box}
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        <div className={styles.paddingRow} />
        {reviews.map((review) =>
          review.isMyReview ? (
            /* 새로 작성된 리뷰 */
            <div key={`newReview-${review.id}`} className={styles.chatRow2}>
              <div className={styles.starRating}>
                {review.modelRatings !== 0 ? (
                  // modelRatings 값이 있는 경우 별점 출력
                  Array.from({ length: 5 }, (_, i) => (
                    <Image
                      width="12"
                      height="12"
                      key={`newReview-${review.id}-star-${i}`}
                      src={
                        i < review.modelRatings
                          ? '/yellow_star.svg'
                          : '/empty_star.svg'
                      }
                      alt="star"
                    />
                  ))
                ) : (
                  // modelRatings 값이 null이거나 없는 경우 spinner 출력
                  <div className={styles.spinner}></div>
                )}
              </div>
              <p className={styles.newReview}>{review.reviewContents}</p>
            </div>
          ) : (
            /* 기존 리뷰 */ <div key={`existingReview-${review.id}`}>
              <div className={styles.chatRow}>
                <p className={styles.oldReview}>{review.reviewContents}</p>
                <div className={styles.starRating}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Image
                      width="12"
                      height="12"
                      key={`existingReview-${review.id}-star-${i}`}
                      src={
                        i < review.modelRatings
                          ? '/yellow_star.svg'
                          : '/empty_star.svg'
                      }
                      alt="star"
                    />
                  ))}
                </div>
              </div>
            </div>
          ),
        )}
      </div>

      <div className={styles.InputWrapper}>
        {/* 오버레이 */}
        {showOverlay && (
          <div className={styles.overlay}>
            실제로 남길 별점을 입력해주세요. 차후 학습에 이용됩니다.
          </div>
        )}
        <div className={styles.inputContainer}>
          <textarea
            ref={textareaRef}
            rows={1}
            className={styles.input}
            value={inputText}
            onChange={(e) => {
              if (textareaRef.current && scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                const isBottom =
                  container.scrollHeight - container.clientHeight ===
                  container.scrollTop;

                // 개행 시 textarea를 일정 높이까지 자동으로 늘리기
                const isMax = textareaRef.current.scrollHeight > 150;
                if (!isMax) {
                  textareaRef.current.style.height = 'auto'; //height 초기화
                  textareaRef.current.style.height =
                    textareaRef.current.scrollHeight + 2 + 'px';
                }

                // 스크롤이 가장 아래에 있을 때 스크롤을 맨 아래로 이동
                if (isBottom) {
                  container.scrollTop =
                    container.scrollHeight - container.clientHeight;
                }
              }
              setInputText(e.target.value);
            }} // 입력 값 업데이트
          ></textarea>

          {!isRating ? (
            // 별점 선택 모드가 비활성화된 경우
            <button
              className={styles.Upload}
              disabled={!inputText.length}
              onClick={() => {
                // 별점 선택 모드 활성화
                setIsRating(true);
                setShowOverlay(true); // 오버레이 활성화
                handleReviewSubmit(); // 리뷰 제출 함수 호출
              }}
            >
              <Image src="/send.svg" width="14" height="12" alt="send" />
            </button>
          ) : (
            // 별점 선택 UI
            <div className={styles.starRatingSelect}>
              {Array.from({ length: 5 }, (_, i) => (
                <Image
                  key={`selectStar-${i}`}
                  src={
                    i <= hoveredIndex ? '/yellow_star.svg' : '/empty_star.svg'
                  }
                  width="24"
                  height="24"
                  alt="star"
                  onClick={() => handleRatingSubmit(i + 1)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(-1)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Camp1Test;
