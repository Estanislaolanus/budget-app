export default function getCategoryAndColor(category: string) {
    switch (category) {
        case "housing":
            return {color: "#de2a6c", category};
        case "transportation":
            return {color: "#fa6a02", category};
        case "groceries":
            return {color: "#3fed1c", category};
        case "personalCare":
            return {color: "#0ee8e4", category: "personal care"};
        case "debtPayents":
            return {color: "#ad4b11", category: "debt payents"};
        case "taxes":
            return {color: "#fa0202", category};
        case "entertainment":
            return {color: "#7211ad", category};
        case "education":
            return {color: "#11ad62", category};
        case "insurance ":
            return {color: "#5aad11", category};
        default:
            return {color: "#d303fc", category};
    }
}