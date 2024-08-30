import { Request, Response, NextFunction } from 'express';

// Função para validar se a string é um Base64 válido
const isBase64 = (str: string) => {
  const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  return base64Regex.test(str);
};

// Middleware para validação do endpoint POST /upload
export const validateUpload = (req: Request, res: Response, next: NextFunction) => {
  const { image, customer_code, measure_datetime, measure_type } = req.body;

  if (!image || !image.startsWith('data:image/')) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Image data does not start with data:image/ prefix',
    });
  }

  const cleanImage = image.split(',')[1];

  if (!cleanImage || !isBase64(cleanImage)) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Image data is invalid or not in base64 format',
    });
  }

  if (!customer_code || typeof customer_code !== 'string') {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Customer code is missing or not a string',
    });
  }

  if (!measure_datetime || isNaN(Date.parse(measure_datetime))) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Measure datetime is invalid',
    });
  }

  if (!measure_type || !['WATER', 'GAS'].includes(measure_type.toUpperCase())) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Measure type is invalid. Must be WATER or GAS',
    });
  }

  next();
};

// Middleware para validação do endpoint PATCH /confirm
export const validateConfirm = (req: Request, res: Response, next: NextFunction) => {
  const { measure_id, confirmed_value } = req.body;

  if (!measure_id || typeof measure_id !== 'string') {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Measure ID is missing or not a string',
    });
  }

  if (typeof confirmed_value !== 'number' || confirmed_value < 0) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Confirmed value must be a valid number greater than or equal to 0',
    });
  }

  next();
};

// Middleware para validação do endpoint GET /list
export const validateList = (req: Request, res: Response, next: NextFunction) => {
  const { customer_code, measure_type } = req.query;

  if (customer_code && typeof customer_code !== 'string') {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Customer code is invalid',
    });
  }

  if (measure_type && !['WATER', 'GAS'].includes(measure_type.toString().toUpperCase())) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Measure type is invalid. Must be WATER or GAS',
    });
  }

  next();
};
