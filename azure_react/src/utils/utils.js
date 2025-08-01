
export const getCSRFToken = () => {
    const name = 'csrftoken'
    console.log(document.cookie);
    
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}
