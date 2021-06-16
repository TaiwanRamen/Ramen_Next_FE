import * as React from 'react'
import Button from "@material-ui/core/Button";
import Link from "next/link";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import {makeStyles, Theme} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StyledMenu from "../StyledMenu/StyledMenu";
import {useRouter} from "next/router";


const useStyles = makeStyles((theme: Theme) => ({
        selection: {
            fontFamily: "JFOpen",
            fontSize: "1rem",
            color: theme.palette.text.primary,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
            "&:hover": {
                color: theme.palette.text.primary,
            }
        },
        divider: {
            height: 28,
            margin: 8,
        },
        imageIcon: {
            width: "24px",
            height: "24px",
        },
        listItemIcon: {
            minWidth: 36,
        }
    }),
);

const SubCategorySection = () => {
    const classes = useStyles();
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuItemClicked = async (url: string) => {
        setAnchorEl(null);
        await router.push(url)
    };
    return (
        <>
            {/*<Button className={classes.selection} onClick={() => router.push("/storesAround")}>*/}
            {/*    附近店家*/}
            {/*</Button>*/}
            <Divider className={classes.divider} orientation="vertical"/>

            <Button className={classes.selection} onClick={() => router.push("/stores")}>
                店家列表
            </Button>
            <Divider className={classes.divider} orientation="vertical"/>

            <Button className={classes.selection} onClick={handleClick}>
                地圖
                <ExpandMoreIcon/>
            </Button>

            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => menuItemClicked('/map')}>
                    <>
                        <ListItemIcon className={classes.listItemIcon}>
                            <img className={classes.imageIcon} src={'/taiwan.svg'} alt={"Taiwan icon"}/>
                        </ListItemIcon>
                        <ListItemText primary="臺灣地圖"/>
                    </>
                </MenuItem>

                <MenuItem  onClick={() => menuItemClicked('/map/taipeiMetro')}>
                    <>
                        <ListItemIcon className={classes.listItemIcon}>
                            <img className={classes.imageIcon} src={'/taipei_metro_logo_gray.svg'}
                                 alt={"Taipei MetroMap icon"}/>
                        </ListItemIcon>
                        <ListItemText primary="臺北捷運地圖"/>
                    </>

                </MenuItem>
                <MenuItem  onClick={() => menuItemClicked('/map/kaohsiungMetro')}>
                    <>
                        <ListItemIcon className={classes.listItemIcon}>
                            <img className={classes.imageIcon} src={'/kaohsiung_metro_logo_gray.svg'}
                                 alt={"Kaohsiung MetroMap icon"}/>
                        </ListItemIcon>
                        <ListItemText primary="高雄捷運地圖"/>
                    </>
                </MenuItem>
            </StyledMenu>
        </>
    );
};

export default SubCategorySection;
