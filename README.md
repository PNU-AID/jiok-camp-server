## 요구사항

- Frontend + backend(지옥캠프2 채점) ([package.json](./ai-web-front/package.json))

  ```text
    Node.js v20.18.0

    "@auth/prisma-adapter": "^2.7.4",
    "@prisma/client": "^6.1.0",
    "jsonwebtoken": "^9.0.2",
    "next": "15.1.3",
    "next-auth": "^5.0.0-beta.25",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-icons": "^5.4.0"
  ```

- Backend ([pip_requirements.txt](./ai-web-back/pip_requirements.txt))

  ```text
    Python 3.11.4

    celery==5.4.0
    Django==5.1
    django-cors-headers==4.6.0
    djangorestframework==3.15.2
    gevent==24.11.1
    lightning==2.4.0
    redis==5.2.0
    torch==2.6.0
    transformers==4.46.3
  ```

- Infra
  ```text
  Docker
  docker compose
  ```

## 시작하기

1. `./ai-web-front`에 `csv` 폴더 생성 후 `csv` 폴더 안에 `solution.csv`, 정답 파일 배치
2. pytorch model 파일 다운로드 [link](https://drive.google.com/drive/u/1/folders/1UawiyY-xDPlHivAj-VEaOi4-I6Wr5gF2)
3. `./ai-web-back/api/ai_web_pytorch`에 `model.pth`, torch 모델 배치
4. Root에 환경변수 파일 세팅 `.env`. 환경변수 내용은 아래 `환경변수` 섹션 참조
5. 아래 명령어 실행

```bash
docker-compose up -d
```

## 환경변수

- realese (배포환경)

```bash
# @/.env

# For Frontend Container
DATABASE_URL="postgres://your_db_user:your_db_password!@postgres:5432/your_dbname_for_nextjs"
# example!! 절대 똑같은 AUTH_SECRET으로 배포하지 마시오.
# npx auth secret
# 위 명령어로 새로 발급받아 사용하는 것을 추천
AUTH_SECRET="JbeFKmocHu/YBitxM9SpYQZNJZOhBsxOhLAwfUV9C48="
NEXTAUTH_URL="https://pnu-aid.com"
AUTH_TRUST_HOST="true"
NEXT_PUBLIC_BACKEND_URL="https://api.pnu-aid.com"

# For Backend Container
SECRET_KEY='django-insecure-your_django_insecure'
CORS_ORIGIN_WHITELIST_FROM='https://api.pnu-aid.com'
CORS_ORIGIN_WHITELIST_TO='https://pnu-aid.com'
HOST_DOMAIN='api.pnu-aid.com'
CLIENT_DOMAIN='pnu-aid.com'
## ec2 환경에서 django와 연결된 대상그룹이 원할하게 동작하는지 체크하기 위해 호스트 등록
HEALTH_CHECK_HOST='your ec2 private ip or load balencer dns'

# For DB Container
DATABASES_NAME=your_dbname_for_django
DATABASES_USER=your_db_user
DATABASES_PASSWORD=your_db_password
DATABASES_HOST=postgres
DATABASES_PORT=5432

# For Redis Container
REDIS_PASSWORD=your_redis_password
REDIS_URL=redis
```
