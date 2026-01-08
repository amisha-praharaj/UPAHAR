import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';


const productRouter = express.Router();
// productRouter.post('/add', upload.array(["images"]), addProduct);
productRouter.post('/add', upload.array("images"), (req, res, next) => {
  console.log("✅ Multer handled the request");
  console.log("Files received:", req.files);
  console.log("Body received:", req.body);
  next();
}, addProduct);



productRouter.get('/list', productList);
productRouter.get('/product/:id', productById);
productRouter.post('/stock', authSeller, changeStock);


export default productRouter;