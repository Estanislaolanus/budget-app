import { Router } from 'express';
import Expense from '../dao/Expense.dao.js';
import ExpenseDTO from '../dto/ExpenseDTO.js';
const expenseDB = new Expense();
const router = Router();
router.get("/", async (req, res) => {
    try {
        const expenses = await expenseDB.getByUserId(req.user.id);
        if (!expenses) return res.json({ message: "Expense not found" });
        const expenseDTO = expenses.map(e => new ExpenseDTO(e));
        res.status(200).json(expenseDTO);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err, message: "Database error: couldn't get array" });
    }
})
    .get("/:month/:year", async (req, res) => {
        try {
            const { month, year } = req.params;
            const expenses = await expenseDB.getByMonthAndYear(req.user.id, month, year);
            if (!expenses) return res.json({ message: "Expense not found" });
            const expenseDTO = expenses.map(e => new ExpenseDTO(e));
            res.status(200).json(expenseDTO);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err, message: "Database error: couldn't get array" });
        }
    })
    .post("/", async (req, res) => {
        try {
            const { amount, category, description, type, timestamp, updated_at } = req.body;
            if (!amount, !category, !type, !timestamp) return res.status(400).json({ success: false, message: 'Some fields are missing' });
            const user_id = req.user.id;
            const createExpense = { amount, category, description, type, timestamp, updated_at, user_id };
            const expense = await expenseDB.save(createExpense);
            const expenseDTO = new ExpenseDTO(expense);
            res.status(200).json({ success: true, message: "Object added to the array", expense: expenseDTO });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err, success: false, message: "Database error: couldn't add the object" });
        }
    })
    .put("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const updateExpense = expenseDB.update(id, req.body);
            if (!updateExpense) return res.status(406).json({ message: "Object not found", success: false });
            return res.status(200).json({ message: "Object updated", success: true });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err, message: "Couldn't update the object" });
        }
    })
    .delete("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const deleteExpense = await expenseDB.deleteById(id);
            if (!deleteExpense) res.status(500).json({ message: 'Object not found' });
            res.status(200).json({ message: "Object deleted" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err, message: "Couldn't delete the object" });
        }
    });
export default router;