import { Router } from 'express';
import { uploadImage, confirmReading, listReadings } from '../controllers/readingController';
import { validateUpload, validateConfirm, validateList } from '../middlewares/validationMiddleware';

const routes = Router();

routes.post('/upload', validateUpload, uploadImage);
routes.patch('/confirm', validateConfirm, confirmReading);
routes.get('/list', validateList, listReadings);

export default routes;
