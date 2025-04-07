/*
  Warnings:

  - You are about to drop the `TempReceipt` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_tempReceiptId_fkey";

-- DropForeignKey
ALTER TABLE "TempReceipt" DROP CONSTRAINT "TempReceipt_userId_fkey";

-- DropTable
DROP TABLE "TempReceipt";

-- CreateTable
CREATE TABLE "tempReceipt" (
    "id" TEXT NOT NULL,
    "store" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "total" INTEGER NOT NULL,
    "change" INTEGER,
    "method" "paymentMethod",
    "rawJson" JSONB NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tempReceipt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tempReceipt" ADD CONSTRAINT "tempReceipt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_tempReceiptId_fkey" FOREIGN KEY ("tempReceiptId") REFERENCES "tempReceipt"("id") ON DELETE SET NULL ON UPDATE CASCADE;
