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

export const createProduct = async (productData, accessToken) => {
    const response = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        body: JSON.stringify(productData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to create product");
    }

    return data;
};

export const updateProduct = async (id, productData, accessToken) => {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        body: JSON.stringify(productData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update product");
    }

    return data;
};

export const deleteProduct = async (id, accessToken) => {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
    }

    return data;
};

export const getCategories = async (accessToken) => {
    const response = await fetch(`${BASE_URL}/categories`, {
        headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
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

export const updateProductRating = async (productId, rating, accessToken) => {
    const response = await fetch(`${BASE_URL}/products/${productId}/rating?star=${rating}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update product rating");
    }

    return data;
};