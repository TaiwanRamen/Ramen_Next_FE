import * as React from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from "@material-ui/icons/AccountCircle";
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StyledMenu from "../StyledMenu/StyledMenu";
import {makeStyles} from "@material-ui/core/styles";
import {useUser} from "../../context/UserContext";
import { useRouter } from 'next/router'
import {setCookie} from 'nookies'
import {Divider} from "@material-ui/core";

const useStyles = makeStyles(() => ({
        imageIcon: {
            height: "24px",
            width: "24px"
        },
        listItemIcon: {
            minWidth: 36,
        },
        divider: {
            width: 190,
            margin: "1px auto"
        }
    }),
);
const UserInfoAndLogout = () => {
    const classes = useStyles();
    const router = useRouter();
    const {user, setUser} = useUser()!;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        setUser(null);
        await setCookie({}, 'access_token', '', {
            maxAge: -1,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
        })
        window.localStorage.removeItem("current_user");
        await router.push("/login");
    }

    return (
        <div>
            <Button
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                onClick={handleClick}
            >
                {user && <Box m={2}>
                    <Typography variant="button" display="inline">
                        {user?.username}
                    </Typography>
                </Box>}
                {user ? <Avatar src={user?.avatar}/> : <AccountCircle/>}
                <ExpandMoreIcon/>
            </Button>

            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>
                    <ListItemIcon className={classes.listItemIcon}>
                        <InfoIcon className={classes.imageIcon}/>
                    </ListItemIcon>
                    <ListItemText primary="個人資料"/>
                </MenuItem>
                <Divider className={classes.divider} orientation="horizontal"/>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <ExitToAppIcon className={classes.imageIcon}/>
                    </ListItemIcon>
                    <ListItemText primary="登出"/>
                </MenuItem>
            </StyledMenu>
        </div>
    );
}
export default UserInfoAndLogout;
