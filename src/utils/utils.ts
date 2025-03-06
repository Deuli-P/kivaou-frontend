const fetching = async(url, method, body) => {

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        ...body,
    });
    const data = await response.json();

    if (response.status >= 400) {
        throw new Error("Erreur de fetch :", data.errors);
    }

    return data;
}

const regexEmail = '/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/';

export { fetching, regexEmail };