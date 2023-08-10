import express from "express";
import {getSellers, createSeller, loginSeller, logoutSeller} from "../controllers/sellerController.js";
<<<<<<< HEAD
=======
import {getSellers, createSeller, loginSeller, logoutSeller} from "../controllers/sellerController.js";
>>>>>>> d2d085d7301f58c1137a65790cfa5393cb77f322

const router = express.Router();

// create API endpoints for seller

router.get('/', getSellers);
router.post('/register', createSeller);
router.post('/login', loginSeller);
router.delete('logout', logoutSeller);

export default router;
