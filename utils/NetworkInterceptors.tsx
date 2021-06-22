import axios from "axios";
import useStackedSnackBar from "../customHooks/UseStackedSnackBar";
import {useUser} from "../context/UserContext";
import {useRouter} from "next/router";
import nookies from "nookies";
import {Box} from "@material-ui/core";

const NetworkInterceptors = ({children}) => {
    const {setUser} = useUser()!;
    const router = useRouter();
    const showSnackBar = useStackedSnackBar();
    axios.interceptors.response.use(
        function (successRes) {
            return successRes;
        }, async (error) => {
            const message = error?.response?.data?.message;
            switch (error.response.status) {
                case 401:
                    setUser(null);
                    window.localStorage.removeItem("current_user");
                    await nookies.set({}, 'access_token', '', {
                        maxAge: -1,
                        path: '/',
                        secure: process.env.NODE_ENV === 'production',
                    })
                    await router.push("/login");
                    break;
                case 403:
                    break;
                case 404:
                    break;
                case 422:
                    break;
                case 500:
                    break;
                default:
                    //history.go(0);
                    break;
            }
            showSnackBar(message, 'error');
            return Promise.reject(error);
        }
    );
    return (
        <>
            {children}
        </>
    );
};

export default NetworkInterceptors;
