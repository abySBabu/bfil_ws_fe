import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    exp?: number;
}

const checkTknExpiry = (onExpireCallback: (expired: boolean) => void, delay = 1000) => {
    const token = sessionStorage.getItem('token');

    if (token) {
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
                    //sessionStorage.clear();
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
            sessionStorage.clear();
            localStorage.clear();
            window.location.href = '/signin';
        }
    }

    return null;
};

export default checkTknExpiry;