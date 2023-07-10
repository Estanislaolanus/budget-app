import bcrypt from "bcrypt";
const hashPassword = async (password, salt) => {
    try {
        return await bcrypt.hash(password, salt);
    } catch (err) {
        console.error(`Bcrypt error: ${err}`);
    }
}
const isValidPassword = async (password, encryptedPassword) => {
    try {
        return await bcrypt.compare(password, encryptedPassword);        
    } catch (err) {
        console.error(`Bcrypt error: ${err}`);
    }
}

export {
    hashPassword,
    isValidPassword
}