export default class IncomeDTO {
    constructor({ _id, amount, source, description, type, timestamp, updated_at }) {
        this.id = _id;
        this.amount = amount;
        this.source = source;
        this.description = description;
        this.timestamp = timestamp;
        this.updated_at = updated_at;
        this.type = type;
    }
}
