# JiokCamp Web Server

This web project provides an official platform for running the **JiokCamp** competitions hosted internally by the **AI Developer (AID) Club**, and also includes a web-based demo for showcasing award-winning models from previous competitions.

## Features

- **JiokCamp 2 – Competition Platform**
  - Participating teams can log in, submit answers, and view their evaluated scores reflected in the real-time ranking.
  - Administrators can create, manage, and audit team accounts.
- **JiokCamp 1 – Award-Winning Model Demo** ([Original Repository](https://github.com/2024-PNU-SW-StudyGroup/Group-11))
  - A web-based demonstration of a high-performing model from **JiokCamp 1**,
which focused on **rating prediction using McDonald’s review data**.

## Requirements

- **Frontend + Backend (JiokCamp 2 Scoring)** ([package.json](./ai-web-front/package.json))

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

- **Backend** ([pip_requirements.txt](./ai-web-back/pip_requirements.txt))

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

- Infrastructure
  ```text
  Docker
  docker compose
  ```

## Getting Started

1. Create a `csv` directory inside `./ai-web-front`, and place `solution.csv` (answer file) in it.
2. Download the PyTorch model file from the link below: [👉 Model Download](https://drive.google.com/drive/u/1/folders/1UawiyY-xDPlHivAj-VEaOi4-I6Wr5gF2)
3. Place `model.pth` in `./ai-web-back/api/ai_web_pytorch`.
4. Set up the environment variable file `.env` at the project root (see the **Environment Variables** section below).
5. Run the following command:

```bash
docker-compose up -d
```

## Environment Variables

- **Release (Production Environment)**

```bash
# @/.env

# For Frontend Container
DATABASE_URL="postgres://your_db_user:your_db_password!@postgres:5432/your_dbname_for_nextjs"
# IMPORTANT: Never reuse the same AUTH_SECRET in production.
# Recommended: generate a new one using
# npx auth secret
AUTH_SECRET="your_auth_secret"
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

## Project Structure

### Directory Layout

```bash
📁 .github/workflows
 └─ 📜 ci-cd.yml            # GitHub Actions CI/CD
📁 ai-web-back              # Django backend for JiokCamp 1 model demo (REST API, Torch)
📁 ai-web-front             # Next.js frontend + JiokCamp 2 competition backend
📁 documents                # Documentation and images
📜 .gitignore
📜 appspec.yml              # AWS CodeDeploy configuration
🐋 compose.yaml             # Docker Compose configuration
📜 deploy.sh                # AWS CodeDeploy script
📜 README.md

```

### Project Flow

![Project Flow](./documents/Web%20Structure.png)

### System Architecture

![System Architecture](./documents/System%20Diagram.png)

## Development Log

- **2024 – 2nd Semester**
  - **Integration**
    - <a href='https://github.com/bluelemon61'><img src='https://avatars.githubusercontent.com/u/67902252?s=12&v=6' alt='profile image'/> Donghoon Lee (bluelemon61)</a> – Infrastructure
  - **JiokCamp 2 Competition Platform**
    - <a href='https://github.com/bluelemon61'><img src='https://avatars.githubusercontent.com/u/67902252?s=12&v=6' alt='profile image'/> Donghoon Lee (bluelemon61)</a> – Frontend, Project Management
    - <a href='https://github.com/mangsgi'><img src='https://avatars.githubusercontent.com/u/143569418?s=12&v=6' alt='profile image'/> Myeongseok Kim (mangsgi)</a> – Backend
  - JiokCamp 1 Award-Winning Model Demo ([Original Repository](https://github.com/2024-PNU-SW-StudyGroup/Group-11))
    - <a href='https://github.com/bluelemon61'><img src='https://avatars.githubusercontent.com/u/67902252?s=12&v=6' alt='profile image'/> Donghoon Lee (bluelemon61)</a>– Project Management, Infrastructure
    - <a href='https://github.com/soheean1370'><img src='https://avatars.githubusercontent.com/u/127065983?s=12&v=6' alt='profile image'/> Sohee An (soheean1370)</a> – PyTorch Model Development
    - <a href='https://github.com/hyunsung1221'><img height='12' src='https://avatars.githubusercontent.com/u/138447029?s=12&v=6' alt='profile image'/> Hyunsung Jo (hyunsung1221)</a> – PyTorch Model Development
    - <a href='https://github.com/JakeFRCSE'><img src='https://avatars.githubusercontent.com/u/162955476?s=12&v=6' alt='profile image'/> Junhyuk Park (JakeFRCSE)</a> – Backend
    - <a href='https://github.com/sanghunii'><img src='https://avatars.githubusercontent.com/u/152972679?s=12&v=6' alt='profile image'/> Sanghun Park (sanghunii)</a> – Backend
    - <a href='https://github.com/Karryun'><img src='https://avatars.githubusercontent.com/u/165464282?s=12&v=6' alt='profile image'/> Doyeon Kwak (Karryun)</a> Frontend
