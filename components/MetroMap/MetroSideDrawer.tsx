import {makeStyles, Theme} from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Typography from "@material-ui/core/Typography";
import DrawerContent from "./DrawerContent";
import {Box, Divider} from "@material-ui/core";
import * as React from "react";

const drawerWidth = 350;

const useStyles = (props: Props) => makeStyles((theme: Theme) => ({
    drawer: {
        zIndex: 1200,
        width: drawerWidth,
        display: 'inline-flex'
    },
    drawerPaper: {
        height: '100%',
        width: drawerWidth,
        top: props.navbarHeight || 64,
        backgroundColor: '#f8f9fa!important'
    },

    cardRoot: {
        margin: "0 auto 60px auto",
        overflowY: "scroll",
    },

    headerRoot: {
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.text.secondary,
        paddingTop: theme.spacing(1),
        justifyContent: "space-between",
    },
    headerText: {
        margin: theme.spacing(1, 3),
    },
    closeButton: {
        color: theme.palette.grey[500],
    },
    headLabel: {
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.text.secondary,
    },
    divider: {
        height: 28,
        margin: 8,
    },


}));


type Props = {
    city: string,
    stationName: string,
    isOpen: boolean,
    stationCode: string,
    toggleDrawerOpen: () => void,
    navbarHeight?: number
}

const MetroSideDrawer = (props: Props) => {
    const isDrawerOpen = props.isOpen;
    const classes = useStyles(props)();
    const toggleDrawerOpen = props.toggleDrawerOpen;
    const stationCode = props.stationCode;
    const stationName = props.stationName;
    const city = props.city;

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="right"
            open={isDrawerOpen}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Box m={1} className={classes.headerRoot}>
                <Typography gutterBottom variant="h6" className={classes.headerText}>
                    {stationName} 站
                </Typography>
                <IconButton onClick={toggleDrawerOpen} className={classes.closeButton}>
                    <CloseIcon/>
                </IconButton>
            </Box>
            <Divider className={classes.divider} orientation="horizontal"/>
            {isDrawerOpen &&
            <div className={classes.cardRoot}>
                <DrawerContent stationCode={stationCode} city={city}/>
            </div>
            }

        </Drawer>

    );
};

export default MetroSideDrawer;
