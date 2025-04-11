import express from 'express'
import { getContentByCategory, getDetailsbyId, getSimilarContentbyId, getTrailerById, getTrendingContent } from '../controller/content.controller.js';


const router = express.Router();
router.get("/trending", (req, res) => getTrendingContent( req, res,))
router.get("/:contentType/:id/trailers",(req, res) => getTrailerById( req, res,))
router.get("/:contentType/:id/details",(req, res) => getDetailsbyId( req, res,))
router.get("/:contentType/:id/similar",(req, res) => getSimilarContentbyId( req, res,))
router.get("/:contentType/:category", (req, res) => getContentByCategory( req, res,))


export default router;

