import { camp1BackendUrl } from '@/constants';

export async function postReview(body: PostReviewReq) {
  const res = await fetch(`${camp1BackendUrl}/api/review`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (res.ok) {
    const data: PostReviewRes = await res.json();
    return data;
  } else {
    console.error('/api/review', res.status, '리뷰 등록 실패');
  }
}

export async function getReview(params: GetReviewReq) {
  const paramsString = new URLSearchParams(params);
  const res = await fetch(`${camp1BackendUrl}/api/review?${paramsString}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    const data: GetReviewRes = await res.json();
    return data;
  } else {
    console.error('/api/review', res.status, '리뷰 리스트 불러오기 실패');
  }
}

export async function getReviewById(id: number) {
  const res = await fetch(`${camp1BackendUrl}/api/review/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    if (res.status === 200) {
      const data: GetReviewByIdRes = await res.json();
      return data;
    } else {
      const data: { message: string } = await res.json();
      alert(data.message);
    }
  } else {
    console.error(`/api/review/${id}`, res.status, '특정 리뷰 불러오기 실패');
  }
}
