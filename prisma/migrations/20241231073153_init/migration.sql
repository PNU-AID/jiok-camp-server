-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "login_id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submits" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "selected" BOOLEAN NOT NULL DEFAULT false,
    "private_score" DOUBLE PRECISION NOT NULL,
    "public_score" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Submits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_id_key" ON "User"("login_id");

-- AddForeignKey
ALTER TABLE "Submits" ADD CONSTRAINT "Submits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
