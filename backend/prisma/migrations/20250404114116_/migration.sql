/*
  Warnings:

  - You are about to drop the `tempReceipt` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_recordId_fkey";

-- DropForeignKey
ALTER TABLE "tempReceipt" DROP CONSTRAINT "tempReceipt_userId_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "tempReceiptId" TEXT,
ALTER COLUMN "recordId" DROP NOT NULL;

-- DropTable
DROP TABLE "tempReceipt";

-- CreateTable
CREATE TABLE "TempReceipt" (
    "id" TEXT NOT NULL,
    "store" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "total" INTEGER NOT NULL,
    "change" INTEGER,
    "method" "paymentMethod",
    "rawJson" JSONB NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TempReceipt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TempReceipt" ADD CONSTRAINT "TempReceipt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_tempReceiptId_fkey" FOREIGN KEY ("tempReceiptId") REFERENCES "TempReceipt"("id") ON DELETE SET NULL ON UPDATE CASCADE;
