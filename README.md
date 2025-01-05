## 요구사항
- `nodejs` `v20.18.1`
- `postgres`

## 시작하기

```bash
# 첫 실행시, 필요한 패키지 설치
npm install

# 개발용 서버 실행
npm run dev
```

## 환경변수
```bash
# @/.env
DATABASE_URL="postgres://username:password!@domain:port/databasename"
# example!! 절대 똑같은 AUTH_SECRET으로 배포하지 마시오.
# npx auth secret
# 위 명령어로 새로 발급받아 사용하는 것을 추천
AUTH_SECRET="JbeFKmocHu/YBitxM9SpYQZNJZOhBsxOhLAwfUV9C48="
NEXTAUTH_URL="http://localhost:3000"
```