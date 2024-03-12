
// Localhost com TTL
const setLocalStorage = (keyName, keyValue, ttl) => {
    const data = {
        value: keyValue,
        ttl: Date.now() + (ttl * 1000),
    }
 
    // Guarda o localhost
    localStorage.setItem(keyName, JSON.stringify(data));
};

const getLocalStorage = (keyName) => {
    const data = localStorage.getItem(keyName);
    if (!data) {
        return null;
    }
 
    const item = JSON.parse(data);
 
    if (Date.now() > item.ttl) {
        localStorage.removeItem(key);
        return null;
    }
 
    return item.value;
};