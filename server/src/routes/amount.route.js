import { Router } from 'express';
import Amount from '../dao/Amount.dao.js';
const amountDB = new Amount()
const router = Router();
router.get("/", async (req, res) => {
    try {
        const findAmount = await amountDB.getByUserId(req.user.id);
        if (!findAmount) return res.json({ message: "Amount array not found" });
        res.status(200).json(findAmount);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err, message: "Database error: couldn't get array" });
    }
})
    .get("/:month/:year", async (req, res) => {
        try {
            const { month, year } = req.params;
            const findAmount = await amountDB.getAmountByMonthAndYear(req.user.id, month, year);
            if (!findAmount) return res.json({ message: "Amount array not found" });
            res.status(200).json(findAmount);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err, message: "Database error: couldn't get array" });
        }
    })
    .post("/", async (req, res) => {
        try {
            const { amount, category, description, type, timestamp, id } = req.body;
            if (!amount, !category, !type, !timestamp, !id) return res.status(400).json({ success: false, message: 'Some fields are missing' });
            const userId = req.user.id;
            const findAmount = await amountDB.getByUserId(userId);
            const newAmount = [...findAmount.amountArray, { amount, category, description, type, timestamp, id }];
            await amountDB.update(findAmount._id, { amountArray: newAmount });
            res.status(200).json({ success: true, message: "Object added to the array" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err, success: false, message: "Database error: couldn't add the object" });
        }
    })
    .put("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const findAmount = await amountDB.getByUserId(userId);
            const update = await amountDB.updateAmount(findAmount._id, id, req.body)
            if (!update.acknowledged) return res.status(406).json({ message: "Object not found", success: false })
            return res.status(200).json({ message: "Object updated", success: true });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err, message: "Couldn't update the object" });
        }
    })
    .delete("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const findAmount = await amountDB.getByUserId(req.user.id);
            const amountArray = findAmount.amountArray.filter(amount => amount.id !== id);
            await amountDB.update(findAmount._id, { amountArray: amountArray });
            res.status(200).json({ message: "Object deleted" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err, message: "Couldn't delete the object" });
        }
    })
export default router;