import { Router } from 'express';
import Amount from '../dao/Amount.dao.js';
const amountDB = new Amount()
const router = Router();
router.post("/", async (req, res) => {
    const { amount, category, type } = req.body;
    const findAmount = await amountDB.getByUserId(req.userId);

    res.status(200).json({});
})
.get("/", async (req, res) => {
    const findAmount = await amountDB.getByUserId(req.userId);
    if(findAmount)
    res.status(200).json({});
})
.delete("/:id", async (req, res) => {
    const findAmount = await amountDB.getByUserId(req.userId);
})
export default router;