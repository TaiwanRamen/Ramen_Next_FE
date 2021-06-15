import {useEffect, useState} from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from "clsx";
import SideDrawer from "../Drawer/SideDrawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from '@material-ui/core/Button';
import {Backdrop, Box, Hidden} from "@material-ui/core";
import UserSection from "./UserSection";
import '../../styles/RamenNav.module.css'
import {useNotification} from "../../context/NotificationContext";
import Badge from "@material-ui/core/Badge";
import {useUser} from "../../context/UserContext";
import SubCategorySection from "./SubCategorySection";
import {useRouter} from "next/router";


const navbarHeight = 64;
const useStyles = makeStyles((theme: Theme) => ({
        appBar: {
            backgroundColor: '#f8f9fa!important',
            color: theme.palette.text.secondary,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            zIndex: 1300,
            height: navbarHeight
        },
        appBarShift: {
            width: '100%',
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(0),
        },
        grow: {
            flexGrow: 2,
        },
        title: {
            fontFamily: "JFOpen",
            fontSize: "1.25rem",
            color: theme.palette.text.primary,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
            "&:hover": {
                color: theme.palette.text.primary,
            }
        },
        backdrop: {
            zIndex: 700,
            color: '#ffffff',
        },
        divider: {
            height: 28,
            margin: 8,
        },
        toolbar: {
            backgroundColor:"#f5f5f5"
        }
    }),
);

export default function RamenNavbar({localUser}) {
    const classes = useStyles();
    const {user, setUser} = useUser();
    const {notificationCount, setNotificationCount} = useNotification()!;
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [listening, setListening] = useState(false);
    const router = useRouter();
    const toggleDrawerOpen = () => {
        setDrawerOpen(!drawerOpen)
    }

    useEffect(()=>{
        const localUserString = window.localStorage.getItem("current_user");
        if (localUserString != null && localUserString !== "null" && localUserString !== "undefined") {
            localUser = JSON.parse(localUserString);
            setUser(localUser)
        }
    },[])

    useEffect(() => {
        if (user && !listening) {
            const url = process.env.NEXT_PUBLIC_BE_URL + "/api/v1/user/unReadNotiCount";

            const eventSource = new EventSource(url, {withCredentials: true});
            eventSource.onopen = function () {
                console.log("Sse connection opened");
            };
            eventSource.onmessage = (event) => {
                const parsedData = event.data;
                setNotificationCount(parseInt(parsedData))
                setListening(true);
            };
            eventSource.onerror = () => {
                eventSource.close();
            }
        }
    }, [user, listening])

    return (
        <div className={classes.grow}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: drawerOpen,
                })}
            >
                <Toolbar className={classes.toolbar}>

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton)}
                    >
                        <Badge badgeContent={notificationCount} variant="dot" color="secondary">
                            {!drawerOpen ? <MenuIcon/> : <ChevronLeftIcon/>}
                        </Badge>
                    </IconButton>
                    <Hidden smDown>
                        <Button size="large" className={classes.title} onClick={() => router.push('/')}>
                            <img src="/ramen.png" alt="" width="32px" height="32px" className="mx-2"/>
                            <span>台灣拉麵倶樂部</span>
                        </Button>
                        <SubCategorySection/>
                    </Hidden>

                    <div className={classes.grow}/>
                    <UserSection/>

                </Toolbar>
            </AppBar>
            <SideDrawer isOpen={drawerOpen} toggleDrawerOpen={toggleDrawerOpen} navbarHeight={navbarHeight}/>
            <Backdrop className={classes.backdrop} open={drawerOpen} onClick={toggleDrawerOpen}/>
        </div>
    );
}
