-- AlterTable
ALTER TABLE "User" ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;
