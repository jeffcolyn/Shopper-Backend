import { Request, Response } from 'express';
import GeminiService from '../services/GeminiService';
import Reading from '../models/Reading';
import { Op } from 'sequelize';

// POST /upload - Faz o upload da imagem e integra com a API do Gemini
export const uploadImage = async (req: Request, res: Response) => {
  const { image, customer_code, measure_datetime, measure_type } = req.body;

  try {
    const date = new Date(measure_datetime);
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const existingReading = await Reading.findOne({
      where: {
        customer_code,
        measure_type,
        measure_datetime: { [Op.between]: [startOfMonth, endOfMonth] },
      },
    });

    if (existingReading) {
      return res.status(409).json({
        error_code: 'DOUBLE_REPORT',
        error_description: 'Leitura do mês já realizada',
      });
    }

    const measure = await GeminiService.analyzeImage(image);

    const newReading = await Reading.create({
      customer_code,
      measure_datetime,
      measure_type,
      measure_value: measure.value,
      image_url: measure.image_url,
    });

    return res.status(200).json({
      image_url: newReading.image_url,
      measure_value: newReading.measure_value,
      measure_id: newReading.id, // Retornando o ID do registro recém-criado
    });
  } catch (error: any) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: error.message,
    });
  }
};

// PATCH /confirm - Confirma ou corrige uma leitura feita
export const confirmReading = async (req: Request, res: Response) => {
  const { measure_id, confirmed_value } = req.body;

  try {
    const reading = await Reading.findByPk(measure_id);

    if (!reading) {
      return res.status(404).json({
        error_code: 'MEASURE_NOT_FOUND',
        error_description: 'Leitura não encontrada',
      });
    }

    if (reading.has_confirmed) {
      return res.status(409).json({
        error_code: 'CONFIRMATION_DUPLICATE',
        error_description: 'Leitura já confirmada',
      });
    }

    reading.measure_value = confirmed_value;
    reading.has_confirmed = true;
    await reading.save();

    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: error.message,
    });
  }
};

// GET /list - Lista as leituras de um cliente
export const listReadings = async (req: Request, res: Response) => {
  const { customer_code, measure_type } = req.query;
  const whereClause: any = {};

  if (customer_code) {
    whereClause.customer_code = customer_code;
  }

  if (measure_type) {
    whereClause.measure_type = measure_type.toString().toUpperCase();
  }

  try {
    const readings = await Reading.findAll({ where: whereClause });

    if (!readings || readings.length === 0) {
      return res.status(404).json({
        error_code: 'MEASURES_NOT_FOUND',
        error_description: 'Nenhuma leitura encontrada',
      });
    }

    return res.status(200).json(readings);
  } catch (error: any) {
    return res.status(500).json({
      error_code: 'SERVER_ERROR',
      error_description: 'Erro ao buscar as leituras',
    });
  }
};
