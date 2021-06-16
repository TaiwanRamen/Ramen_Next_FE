import {Box} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        maxWidth: "1440px",
        width: "90%",
        padding: "0 15px",
        margin: "100px auto 0 auto",
    }
}))

const MainLayout = ({children}) => {
    const classes = useStyles();
    return (
        <Box mt={15} className={classes.container}>
            {children}
        </Box>
    );
};

export default MainLayout;

