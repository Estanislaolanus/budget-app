import { Router } from 'express';
import Income from '../dao/Income.dao.js';
import IncomeDTO from '../dto/IncomeDTO.js';
const incomeDB = new Income();
const router = Router();
router.get("/", async (req, res) => {
    try {
        const incomes = await incomeDB.getByUserId(req.user.id);
        if (!incomes) return res.json({ message: "Income not found" });
        const incomeDTO = incomes.map(i => new IncomeDTO(i));
        res.status(200).json(incomeDTO);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err, message: "Database error: couldn't get array" });
    }
})
    .get("/:month/:year", async (req, res) => {
        try {
            const { month, year } = req.params;
            const incomes = await incomeDB.getByMonthAndYear(req.user.id, month, year);
            if (!incomes) return res.json({ message: "Income not found" });
            const incomeDTO = incomes.map(i => new IncomeDTO(i));
            res.status(200).json(incomeDTO);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err, message: "Database error: couldn't get array" });
        }
    })
    .post("/", async (req, res) => {
        try {
            const { amount, source, description, type, timestamp, updated_at } = req.body;
            if (!amount, !source, !type, !timestamp) return res.status(400).json({ success: false, message: 'Some fields are missing' });
            const user_id = req.user.id;
            const createIncome = { amount, source, description, type, timestamp, updated_at, user_id };
            const income = await incomeDB.save(createIncome);
            const incomeDTO = new IncomeDTO(income);
            res.status(200).json({ success: true, message: "Object added to the array", income: incomeDTO });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err, success: false, message: "Database error: couldn't add the object" });
        }
    })
    .put("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const updateIncome = incomeDB.update(id, req.body);
            if (!updateIncome) return res.status(406).json({ message: "Object not found", success: false });
            return res.status(200).json({ message: "Object updated", success: true });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err, message: "Couldn't update the object" });
        }
    })
    .delete("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const deleteIncome = await incomeDB.deleteById(id);
            if (!deleteIncome) res.status(500).json({ message: 'Object not found' });
            res.status(200).json({ message: "Object deleted" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err, message: "Couldn't delete the object" });
        }
    });
export default router;