from myapp.celery import app
from .models import Review

from .ai_web_pytorch.review_model import ReviewService


model = ReviewService(model_path='./api/ai_web_pytorch/model.pth')

@app.task()
def predict(string:str, review_id:int) -> None:
    modelRatings = model.predict_review_score(string)
    review = Review.objects.get(id = review_id)
    review.modelRatings = modelRatings
    review.save(update_fields=['modelRatings'])