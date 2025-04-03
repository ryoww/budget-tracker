import { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import multer from "multer";
import OpenAI from "openai";
import { sendErrorResponse, sendSuccessResponse } from "../../lib/sendResponse";

const openai = new OpenAI({ apiKey: process.env.API_KEY });

class receiptService {
    public static async parseReceipt(req: Request, res: Response) {
        try {
            const filePath = req.file?.path;
            if (!filePath) {
                return sendErrorResponse(res, "MISSING_PARAMETERS");
            }

            const imageData = await fs.readFile(filePath);
            const base64Image = imageData.toString("base64");

            const prompt = `This is an image of a Japanese receipt.

            Please extract the following information and return it in JSON format:

            - Store name ("store")
            - Date and time of purchase ("date")
            - List of purchased items ("items"):
                Each item should include:
                - Name ("name")
                - Price in yen ("price")
            - If there are discounts, include them as items with a negative price.
            - Total amount ("total")
            - Payment method and change ("payment.method" and "payment.change")

            Return the result using this JSON structure:

            {
            "store": "",
            "date": "",
            "items": [
                { "name": "", "price": 0 }
            ],
            "total": 0,
            "payment": {
                "method": "",
                "change": 0
            }
            }`;

            const response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    {
                        role: "user",
                        content: [
                            { type: "text", text: prompt },
                            {
                                type: "image_url",
                                image_url: {
                                    url: `data:image/jpeg;base64,${base64Image}`,
                                },
                            },
                        ],
                    },
                ],
                max_tokens: 1000,
            });

            await fs.unlink(filePath);

            const content = response.choices[0].message.content;
            if (!content) {
                return sendErrorResponse(res, "INTERNAL_SERVER_ERROR");
            }

            const cleaned = content.replace(/```json|```/g, "").trim();
            const json = JSON.parse(cleaned);

            return sendSuccessResponse(res, "OK", { data: json });
        } catch (error) {
            console.error("Error during receipt parsing:", error);
            return sendErrorResponse(res, "INTERNAL_SERVER_ERROR");
        }
    }
}

export default receiptService;
