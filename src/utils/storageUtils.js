export const setLocalStorage = (name, data) => {
    localStorage.setItem(name, JSON.stringify(data));
};

export const getLocalStorage = (name) => {
    const data = JSON.parse(localStorage.getItem(name));
    return data;
};
