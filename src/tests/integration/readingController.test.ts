import request from 'supertest';
import app from '../../app';
import sequelize from '../../config/database';

// Mock do Sequelize
jest.mock('../../config/database', () => {
  return {
    define: jest.fn().mockReturnValue({
      init: jest.fn(),
      sync: jest.fn().mockResolvedValue(true),
    }),
    sync: jest.fn().mockResolvedValue(true),
    close: jest.fn().mockResolvedValue(true),
    authenticate: jest.fn().mockResolvedValue(true),
  };
});

beforeAll(async () => {
  // Simulação da sincronização do banco de dados
  await sequelize.sync();
});

afterAll(async () => {
  // Simulação do fechamento do banco de dados
  await sequelize.close();
});

describe('POST /api/upload', () => {
  it('should upload image and return measure details', async () => {
    const response = await request(app)
      .post('/api/upload')
      .send({
        image: 'data:image/png;base64,...',
        customer_code: '123',
        measure_datetime: new Date().toISOString(),
        measure_type: 'WATER',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('image_url');
    expect(response.body).toHaveProperty('measure_value');
  });
});
