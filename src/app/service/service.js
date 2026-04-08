const BASE_URL = "https://homework-api.noevchanmakara.site/api/v1";

export const login = async (email, password) => {
    const response = await fetch(`${BASE_URL}/auths/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    return response.json();
};

export const register = async (firstName, lastName, email, password, birthdate) => {
    const response = await fetch(`${BASE_URL}/auths/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password, birthdate }),
    });
    return response.json();
};

export const getProducts = async (accessToken) => {
    const response = await fetch(`${BASE_URL}/products`, {
        headers: accessToken
            ? {
                Authorization: `Bearer ${accessToken}`,
            }
            : {},
        cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
        return {
            ...data,
            payload: [],
        };
    }

    return data;
};

export const getProductById = async (id, accessToken) => {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
        headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : {},
        cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
        return null;
    }

    return data;
};