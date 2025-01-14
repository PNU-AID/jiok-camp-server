## 요구사항
- `nodejs` `v20.18.1`
- `postgres`

## 시작하기

1. Root에 `csv` 폴더 생성 후 `csv` 폴더안에 `solution.csv`, 정답이 있는 파일 배치
2. Root에 환경변수 파일 세팅 `.env`. 환경변수 내용은 아래 `환경변수` 섹션 참조
3. 아래 명령어 실행
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