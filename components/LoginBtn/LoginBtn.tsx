import FacebookLogin from "react-facebook-login";
import {useState} from "react";
import axios from 'axios';
import {parseCookies, setCookie} from 'nookies';
import {useUser} from "../../context/UserContext";
import LoadingIcon from "../Loading/LoadingIcon";
import Button from "@material-ui/core/Button";
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useRouter} from "next/router";

const useStyles = makeStyles(() => ({
    login: {
        margin: 10,
        fontSize: "1rem"
    }
}))

type Props = {
    disabled?: boolean
}
const LoginBtn = (props: Props) => {
    const classes = useStyles();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoginFail, setIsLoginFail] = useState(false);
    const [loginCount, setLoginCount] = useState(0);

    const {user, setUser} = useUser();
    const url = `${process.env.NEXT_PUBLIC_BE_URL}/api/v1/user/oauth/facebook`;

    const componentClicked = () => {
        setIsLoading(true);
    };

    const loginToOurServer = async (response) => {
        try {
            let payload = {"access_token": response.accessToken};

            let serverRes = await axios.post(url, payload, {headers: {'Content-Type': 'application/json'}});

            let loginUser = serverRes.data.data.user;
            setUser(loginUser);

            setCookie(null, 'access_token', serverRes.data.data.token, {
                maxAge: 30 * 24 * 60 * 60,
                sameSite: "none",
                secure: true,
                domain:'.taiwanramen.club'
            })
            window.localStorage.setItem("current_user", JSON.stringify(loginUser));
        } catch (e) {
            await setCookie(null, 'access_token', '', {
                maxAge: -1,
                path: '/',
                secure: process.env.NODE_ENV === 'production',
            })
            window.localStorage.removeItem("current_user");
            setIsLoginFail(true);
            setLoginCount(loginCount + 1)
        } finally {
            setIsLoading(false);
            await router.replace('/')
        }
    };

    const onFailure = () => {
        setIsLoading(false);
        setIsLoginFail(true);
        setLoginCount(loginCount + 1)
    };

    const handleFailure = () => {
        setIsLoginFail(false);
    };

    const fields = 'id, name, gender, picture.type(large), email';

    if (user) {
        return <></>
    }

    return (
        <Box>
            {isLoading && <div className={classes.login}>
                <LoadingIcon/>
                <span>登入中，請稍等</span>
            </div>}

            {isLoginFail && loginCount < 3 &&
            <div>
                <Button variant="outlined" color="secondary" size="large" onClick={handleFailure}
                        className={classes.login}>
                    登入失敗，請點擊重試
                </Button>
            </div>
            }
            {loginCount >= 3 && <div className={classes.login}>
                <p>登入異常，請重新整理或稍後再試</p>
            </div>}

            {!isLoading && !isLoginFail && <FacebookLogin
                appId={process.env.NEXT_PUBLIC_FB_ID}
                autoLoad={false}
                fields={fields}
                cookie={true}
                textButton=" 使用facebook登入"
                onClick={componentClicked}
                callback={loginToOurServer}
                onFailure={onFailure}
                cssClass="btn btn-lg btn-outline-primary m-2 p-2"
                version="10.0"
                icon="fab fa-facebook-f"
                isDisabled={props.disabled && !isLoading}
            />}
        </Box>
    );
};

export default LoginBtn;
