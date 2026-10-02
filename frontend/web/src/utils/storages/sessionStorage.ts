export const setItem = (data: { key: string; value: string }): void => {
    if (typeof window !== "undefined") {
        window.sessionStorage?.setItem(data.key, data.value);
    }
};

export const getItem = (key: string): string | null => {
    if (typeof window !== "undefined") {
        const data = window.sessionStorage?.getItem(key);
        return data;
    }
    return null;
};

export const removeItem = (key: string): void => {
    if (typeof window !== "undefined") {
        window.sessionStorage?.removeItem(key);
    }
};

export const clearStorage = (): void => {
    if (typeof window !== "undefined") {
        window.sessionStorage?.clear();
    }
};
