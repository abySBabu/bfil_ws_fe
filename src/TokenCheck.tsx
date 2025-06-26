import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    exp?: number;
}

const checkTknExpiry = (onExpireCallback: (expired: boolean) => void, delay = 1000) => {
    const token = localStorage.getItem('token');
//    if ((token) && !(token == null)) 
    if ((token) && (token !== "null")) {
        const decodedToken: DecodedToken = jwtDecode(token);

        if (decodedToken.exp) {
            const expiryTime = new Date(decodedToken.exp * 1000).getTime();
            const currentTime = new Date().getTime();
            const timeout = expiryTime - currentTime;

            const onExpire = () => {
                if (onExpireCallback) {
                    onExpireCallback(true);
                }
                // window.alert('Token Expired');
                setTimeout(() => {
                    //localStorage.clear();
                    //localStorage.clear();
                    //window.location.href = '/bfilreactdev/dashboard';
                }, delay);
            };

            if (timeout > 0) {
                const timerRef = setTimeout(onExpire, timeout);
                return { timerRef, tknExpired: false };
            } else {
                onExpire();
            }
        } else {
            console.error('Token does not have an expiration date.');
            onExpireCallback(true);
            localStorage.clear();
            localStorage.clear();
            window.location.href = '/signin';
        }
    }

    return null;
};

export default checkTknExpiry;