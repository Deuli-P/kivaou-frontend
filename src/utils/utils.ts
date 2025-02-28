import bcrypt from "bcryptjs";

const hashPassword = async (password: string)=> {
    const newPassword = bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.error(err);
        }
        return hash;
    });
    return newPassword;
};

const fetching = async(url, method, body) => {

    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        ...body,
    });
    const data = await response.json();

    if (response.status >= 400) {
        throw new Error(data.errors);
    }

    return data;
}

const regexEmail = '/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/';

export { hashPassword, fetching, regexEmail };