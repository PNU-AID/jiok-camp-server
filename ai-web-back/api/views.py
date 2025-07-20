from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Review

from .tasks import predict

from django.core.paginator import Paginator

@api_view(["POST" ,"GET"])
def review(request):
    if request.method == "POST":
        reviewContents = request.data['reviewContents']
        userRatings = request.data['userRatings']
        R = Review.objects.create(reviewContents = reviewContents, userRatings=userRatings)
        review_id = R.id
        predict.delay(reviewContents, review_id)
        return Response({'id':review_id}, status=status.HTTP_201_CREATED)

    elif request.method == "GET":
        allReviews = Review.objects.order_by('id')
        page = int(request.query_params.get('page',1))          
        paginator = Paginator(allReviews, request.query_params.get('size'))         
        reviews = paginator.get_page(page)          
        maxPage = max(paginator.page_range)
        result = {'reviews': [{"id": review.id, 
                               "reviewContents":review.reviewContents, 
                               "modelRatings":review.modelRatings} for review in reviews],
                    'pageinfo': maxPage}
        return Response(result, status=status.HTTP_200_OK )
    

@api_view(["GET"])
def review_id(request, reviewId):
    if request.method == "GET":
        review = Review.objects.filter(id = reviewId)
        if (review) :
            review = review = Review.objects.get(id = reviewId)
            result = {"id": review.id, "reviewContents": review.reviewContents, "modelRatings":review.modelRatings}
            return Response(result, status = status.HTTP_200_OK)
        else :
            result = {
	                "message": "등록되지 않은 메세지 id입니다"
                    }
            return  Response(result, status = status.HTTP_204_NO_CONTENT)
        
@api_view(["GET"])
def check(request, checkId):
    if request.method == "GET":
        review = Review.objects.filter(id = checkId)
        if (review):
            review = Review.objects.get(id = checkId)
            if (review.modelRatings) :
                result = {"status":True}
                return Response(result, status = status.HTTP_200_OK)
                
            else :
                result = {"status":False}
                return  Response(result, status = status.HTTP_200_OK)
        else :
            result = {
	                "message": "등록되지 않은 메세지 id입니다"
                    }
            return  Response(result, status = status.HTTP_204_NO_CONTENT)

        