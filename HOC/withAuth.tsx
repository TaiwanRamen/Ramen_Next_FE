import {useRouter} from "next/router";
import useStackedSnackBar from "../customHooks/UseStackedSnackBar";
import {parseCookies} from "nookies";

const withAuth = (WrappedComponent) => {
    return (props) => {
        if (typeof window !== "undefined") {
            const router = useRouter();
            const showSnackBar = useStackedSnackBar();
            const accessToken = parseCookies(null, 'access_token')
            const currentUser = window.localStorage.getItem("current_user");

            if (!accessToken || !currentUser) {
                showSnackBar(`需要登入以瀏覽此頁面`, 'error');
                router.replace("/login");
                return null;
            }

            return <>
                <WrappedComponent {...props} />
            </>;
        }
        return null;
    };
};
export default withAuth;