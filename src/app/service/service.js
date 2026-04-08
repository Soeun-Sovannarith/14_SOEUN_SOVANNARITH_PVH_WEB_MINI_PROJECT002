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

export const register = async (name, email, password, birthdate) => {
    const response = await fetch(`${BASE_URL}/auths/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, birthdate }),
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