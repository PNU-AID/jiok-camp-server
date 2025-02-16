# 지옥캠프 웹 서버

AID 내부에서 개최하는 지옥캠프 대회의 진행 사이트와 이전 대회의 모델을 시연해볼 수 있는 기능을 가진 웹 프로젝트입니다.

## 기능

- 지옥캠프2 대회 진행 파트
  - 참가한 팀들이 로그인하여 정답을 제출, 채점된 점수가 랭킹에 반영되어 나타납니다.
  - 어드민은 팀 계정을 생성, 관리 및 감사가 가능합니다.
- 지옥캠프1 우수 모델 시연 파트 ([Original Repository](https://github.com/2024-PNU-SW-StudyGroup/Group-11))
  - 지옥캠프1(맥도날드 리뷰 데이터 별점 예측)의 우수 모델을 웹에서 시연해 볼 수 있도록 개발하였습니다.

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

## 프로젝트 구조

### 폴더구조

```bash
📁.github ─ 📁workflows ─ 📜ci-cd.yml # Github Actions CI/CD
📁ai-web-back # 지옥캠프1 모델 시연 파트 Django Backend (Django REST API, Torch)
📁ai-web-front # 프로젝트 전체 Next.js Frontend + 지옥캠프2 대회 파트 Next.js Backend
📁documents # 프로젝트에 설명에 필요한 문서, 이미지 폴더
📜.gitignore
📜appspec.yml # AWS Code Deploy 관련 설정 파일
🐋compose.yaml # Docker Compose 파일
📜deploy.sh # AWS Code Deploy 스크립트
📜README.md
```

### 프로젝트 흐롬

![프로젝트 흐름](./documents/Web%20Structure.png)

### 시스템 구조

![시스템구조](./documents/System%20Diagram.png)

## 개발 로그

- 2024-2학기
  - 각 파트 통합
    - <a href='https://github.com/bluelemon61'><img src='https://avatars.githubusercontent.com/u/67902252?s=12&v=6' alt='profile image'/> bluelemon61</a> Infra
  - 지옥캠프2 대회 진행 파트
    - <a href='https://github.com/bluelemon61'><img src='https://avatars.githubusercontent.com/u/67902252?s=12&v=6' alt='profile image'/> bluelemon61</a> FE, PM
    - <a href='https://github.com/mangsgi'><img src='https://avatars.githubusercontent.com/u/143569418?s=12&v=6' alt='profile image'/> mangsgi</a> BE
  - 지옥캠프1 우수 모델 시연 파트 ([Original Repository](https://github.com/2024-PNU-SW-StudyGroup/Group-11))
    - <a href='https://github.com/bluelemon61'><img src='https://avatars.githubusercontent.com/u/67902252?s=12&v=6' alt='profile image'/> bluelemon61</a> PM, Infra
    - <a href='https://github.com/soheean1370'><img src='https://avatars.githubusercontent.com/u/127065983?s=12&v=6' alt='profile image'/> soheean1370</a> Torch 개발
    - <a href='https://github.com/hyunsung1221'><img height='12' src='https://avatars.githubusercontent.com/u/138447029?s=12&v=6' alt='profile image'/> hyunsung1221</a> Torch 개발
    - <a href='https://github.com/JakeFRCSE'><img src='https://avatars.githubusercontent.com/u/162955476?s=12&v=6' alt='profile image'/> JakeFRCSE</a> BE
    - <a href='https://github.com/sanghunii'><img src='https://avatars.githubusercontent.com/u/152972679?s=12&v=6' alt='profile image'/> sanghunii</a> BE
    - <a href='https://github.com/Karryun'><img src='https://avatars.githubusercontent.com/u/165464282?s=12&v=6' alt='profile image'/> Karryun</a> FE
