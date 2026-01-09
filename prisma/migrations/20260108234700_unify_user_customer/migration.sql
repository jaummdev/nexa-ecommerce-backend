/*
  Warnings:

  - You are about to drop the column `customerId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_customerId_fkey";

-- DropIndex
DROP INDEX "Cart_customerId_key";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "customerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "customerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT;

-- DropTable
DROP TABLE "Customer";

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
