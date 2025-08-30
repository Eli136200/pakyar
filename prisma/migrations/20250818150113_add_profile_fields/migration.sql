-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "email" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "profileCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "referralCode" TEXT,
ADD COLUMN     "userType" TEXT NOT NULL DEFAULT 'شهروندی';
