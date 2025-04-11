import express from 'express'
import { getSearchHistory, removeItemFromHistory, searchQuery } from '../controller/search.controller.js';


const router = express.Router();

router.get("/:queryType/:query", (req, res) => searchQuery( req, res,))

router.get("/history", (req, res) => getSearchHistory( req, res,))

router.delete("/history/:id", (req, res) => removeItemFromHistory( req, res,))


export default router;

