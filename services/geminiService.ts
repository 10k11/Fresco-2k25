import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';
const generateHeroImage = async (): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable is not set.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `A high-resolution, cinematic hero image for a professional web invitation. The scene is the interior of a modern, empty, non-alcoholic pub and lounge. The background features a dynamic, subtly moving texture of an energetic interior, focusing on dim, luxurious lighting (deep blues, purples, and emerald green accents) and upscale club architecture. The atmosphere is high-energy and visually striking, yet explicitly and strictly non-alcoholic. Focus on the ambiance, luxurious furniture, and architectural details. No people or text should be visible in the image.`;

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '16:9',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate hero image.");
    }
};

export { generateHeroImage };