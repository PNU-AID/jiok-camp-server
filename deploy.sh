cd /home/ec2-user/deploy

# 기존 컨테이너 종료
docker-compose down

# 새로운 컨테이너 실행
docker-compose up -d --build