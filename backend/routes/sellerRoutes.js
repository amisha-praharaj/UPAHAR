import express from 'express';
import {  isSellerauth, sellerLogin, sellerlogout } from '../controllers/sellerController.js';
import authSeller from '../middlewares/authSeller.js';

const sellerRoute = express.Router();


sellerRoute.post('/login',sellerLogin);
sellerRoute.get('/is-sauth',authSeller,isSellerauth);
sellerRoute.get('/logout',sellerlogout)


export default sellerRoute;