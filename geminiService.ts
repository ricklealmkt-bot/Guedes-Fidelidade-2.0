
import { GoogleGenAI } from "@google/genai";

// Initialize the Google GenAI SDK with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Fetches a professional car care tip from Gemini.
 * Uses gemini-3-flash-preview for quick, efficient text generation.
 */
export const getCarCareTip = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Dê uma dica curta e profissional sobre cuidados automotivos (lavagem, estética ou proteção de pintura) para clientes do Lava Jato Guedes. Máximo 150 caracteres.",
    });
    
    // Access the text property directly (not a method) as per the guidelines
    return response.text?.trim() || "Mantenha o brilho do seu carro sempre em dia!";
  } catch (error) {
    console.error("Error fetching AI tip:", error);
    // Fallback message in case of API error or network issues
    return "Limpeza regular protege seu veículo contra corrosão e desvalorização.";
  }
};
