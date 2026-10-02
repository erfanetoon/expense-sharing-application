export const setItem = (data: { key: string; value: string }): void => {
    if (typeof window !== "undefined") {
        localStorage?.setItem(data.key, data.value);
    }
};

export const getItem = (key: string): string | null => {
    if (typeof window !== "undefined") {
        const data = localStorage?.getItem(key);
        return data;
    }
    return null;
};

export const removeItem = (key: string): void => {
    if (typeof window !== "undefined") {
        localStorage?.removeItem(key);
    }
};

export const clearStorage = (): void => {
    if (typeof window !== "undefined") {
        localStorage?.clear();
    }
};
