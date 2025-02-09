from review_model import ReviewService

def main():
    # 서비스 초기화
    review_service = ReviewService()
    
    print("리뷰 점수 예측 서비스가 시작되었습니다.")
    print("종료하려면 'stop'을 입력하세요.\n")
    
    while True:
        text = input("Enter review text: ")
        if text.lower() == "stop":
            print("서비스를 종료합니다.")
            break
        try:
            predicted_score = review_service.predict_review_score(text)
            print(f"Predicted Score: {predicted_score}\n")
        except Exception as e:
            print(f"예측 중 오류 발생: {e}\n")

if __name__ == "__main__":
    main()
