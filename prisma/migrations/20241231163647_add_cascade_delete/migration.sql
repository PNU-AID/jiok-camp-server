-- DropForeignKey
ALTER TABLE "Submits" DROP CONSTRAINT "Submits_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Submits" ADD CONSTRAINT "Submits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
