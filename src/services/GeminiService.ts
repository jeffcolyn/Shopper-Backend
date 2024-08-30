import dotenv from 'dotenv';

dotenv.config();

export default class GeminiService {
    static async analyzeImage(image: string) {
      const apiKey = process.env.GOOGLE_API_KEY;

      
      
      return {
        value: 123, // Valor fictício retornado após a análise
        image_url: 'https://example.com/image.jpg', // URL fictícia da imagem processada
      };
    }
}
