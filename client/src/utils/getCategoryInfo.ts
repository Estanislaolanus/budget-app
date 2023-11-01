export default function getCategoryInfo(category: string) {
    switch (category) {
        case "transportation":
            return { color: "#ff8b52", category, name: "Transportation", img: "./assets/categories/transportation.png" };
        case "groceries":
            return { color: "#3fed1c", category, name: "Groceries", img: "./assets/categories/grocery.png" };
        case "personalCare":
            return { color: "#0ee8e4", category: "personal care", name: "Personal Care", img: "./assets/categories/personal-care.png" };
        case "debtPayents":
            return { color: "#ad4b11", category: "debt payents", name: "Debt Payents", img: "./assets/categories/debt.png" };
        case "taxes":
            return { color: "#fa0202", category, name: "Taxes", img: "./assets/categories/tax.png" };
        case "entertainment":
            return { color: "#7211ad", category, name: "Entertainment", img: "./assets/categories/entertainment.png" };
        case "education":
            return { color: "#11ad62", category, name: "Education", img: "./assets/categories/education.png" };
        case "insurance":
            return { color: "pink", category, name: "Insurance", img: "./assets/categories/insurance.png" };
        case "housing":
            return { color: "#f6ff00", category, name: "Housing", img: "./assets/categories/housing.png" };
        default:
            return { color: "#688b07", category, name: "Other" };
    }
}