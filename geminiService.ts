
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getCarCareTip(): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Gere uma dica curta e impactante (máximo 280 caracteres) sobre a importância de manter o carro limpo e protegido (lavagem ou polimento) para um cliente de um lava-jato de estética automotiva chamado 'Guedes'. Use um tom motivador e profissional em português do Brasil.",
      config: {
        temperature: 0.8,
        topP: 0.95,
      },
    });
    return response.text || "Mantenha seu brilho em dia! Um carro limpo dura muito mais.";
  } catch (error) {
    console.error("Error fetching tip:", error);
    return "Um carro limpo não é apenas estética, é conservação do seu patrimônio.";
  }
}
