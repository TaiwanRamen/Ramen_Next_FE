import React from 'react';
import {makeStyles, Theme} from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) => ({
    container: {
        color: theme.palette.text.secondary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "30px auto 0 auto",
    },
}))
type Props = {
    message: string
};
const ErrorMessage = (props: Props) => {
    const classes = useStyles();
    const message = props.message;
    return (
        <div className={classes.container}>
            {message}
        </div>
    );
};

export default ErrorMessage;
