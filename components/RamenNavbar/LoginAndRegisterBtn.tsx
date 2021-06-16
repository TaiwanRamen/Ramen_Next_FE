import {Button} from '@material-ui/core';
import {makeStyles, Theme} from "@material-ui/core/styles";
import {useRouter} from "next/router";

const useStyles = makeStyles((theme: Theme) => ({
    login: {
        color: theme.palette.text.secondary,
        "&:hover": {
            color: theme.palette.text.primary,
        }
    },
}));
const LoginAndRegisterBtn = () => {
    const classes = useStyles();
    const router = useRouter();
    return (
        <Button
            variant="outlined"
            className={classes.login}
            onClick={()=>router.push('/login')}
        >
            登入
        </Button>
    );
};

export default LoginAndRegisterBtn;
