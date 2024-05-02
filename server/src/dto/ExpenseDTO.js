export default class ExpenseDTO {
    constructor({ _id, amount, category, description, timestamp, updated_at, type }) {
        this.id = _id;
        this.amount = amount;
        this.category = category;
        this.description = description;
        this.timestamp = timestamp;
        this.updated_at = updated_at;
        this.type = type;
    }
}