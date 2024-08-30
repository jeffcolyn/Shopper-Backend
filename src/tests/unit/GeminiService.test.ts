import GeminiService from '../../services/GeminiService';

describe('GeminiService', () => {
  it('should analyze image and return measure value and image URL', async () => {
    const result = await GeminiService.analyzeImage('data:image/png;base64,...');
    
    expect(result).toHaveProperty('value');
    expect(result).toHaveProperty('image_url');
    expect(result.value).toBe(123); // Ajuste conforme o valor fictício
    expect(result.image_url).toBe('https://example.com/image.jpg'); // Ajuste conforme a URL fictícia
  });
});
