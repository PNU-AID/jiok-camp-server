from django.http import JsonResponse

# EC2 Load balencer와 연결된 target group이 상태를 검사하기 위한 미들웨어
# target group 설정에서 상태검사 url을 /health로 요청하도록 변경해야 함.
class HealthCheckMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path == "/health":
          return JsonResponse({"status": "ok"}, status=200)
        response = self.get_response(request)
        return response