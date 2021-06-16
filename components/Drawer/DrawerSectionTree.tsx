import {makeStyles} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import NotificationsIcon from "@material-ui/icons/Notifications";
// import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import CommentIcon from "@material-ui/icons/Comment";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import {useNotification} from "../../context/NotificationContext";
import {faMapMarkedAlt, faStoreAlt, faStreetView, faUser} from "@fortawesome/free-solid-svg-icons";
// import InfoIcon from '@material-ui/icons/Info';
// import SettingsIcon from "@material-ui/icons/Settings";
import Divider from "@material-ui/core/Divider";
import {useUser} from "../../context/UserContext";
import StyledTreeItemHead from "../StyledTree/StyledTreeItemHead";
import StyledTreeItem from "../StyledTree/StyledTreeItem";
import {Box} from "@material-ui/core";

const useStyles = makeStyles(() => ({
        root: {
            // height: 264,
            // flexGrow: 0.8,
            maxWidth: 240,
        },
    }),
);

type Props = {
    toggleDrawerOpen: () => void;
}


export default function CustomTreeView(props: Props) {
    const classes = useStyles();
    const {user} = useUser()!;
    const {notificationCount, setNotificationCount} = useNotification()!;
    const toggleDrawerOpen = props.toggleDrawerOpen;

    return (

        <Box mt={1}>
            <TreeView
                className={classes.root}
                defaultExpanded={['10', '20']}
                defaultCollapseIcon={<ArrowDropDownIcon/>}
                defaultExpandIcon={<ArrowRightIcon/>}
            >
                <StyledTreeItem
                    nodeId="0"
                    labelText="附近店家"
                    href="/storesAround"
                    labelIconFA={faStreetView}
                    onClick={toggleDrawerOpen}
                />
                <Divider/>
                <StyledTreeItem
                    nodeId="1"
                    labelText="店家列表"
                    href="/stores"
                    labelIconFA={faStoreAlt}
                    onClick={toggleDrawerOpen}
                />
                <Divider/>

                <StyledTreeItemHead
                    nodeId="10"
                    labelText="地圖"
                    labelIconFA={faMapMarkedAlt}
                >
                    <StyledTreeItem
                        nodeId="11"
                        labelText="臺灣地圖"
                        href="/map"
                        labelIconSVG={"/taiwan.svg"}
                        onClick={toggleDrawerOpen}
                    />
                    <StyledTreeItem
                        nodeId="12"
                        labelText="臺北捷運地圖"
                        labelIconSVG={"/taipei_metro_logo_gray.svg"}
                        href="/map/taipeiMetro"
                        onClick={toggleDrawerOpen}
                    />
                    <StyledTreeItem
                        nodeId="13"
                        labelText="高雄捷運地圖"
                        labelIconSVG={"/kaohsiung_metro_logo_gray.svg"}
                        href="/map/kaohsiungMetro"
                        onClick={toggleDrawerOpen}
                    />
                </StyledTreeItemHead>
                <Divider/>

                {!!user && <>
                    <StyledTreeItemHead
                        nodeId="20"
                        labelText="用戶專區"
                        labelIconFA={faUser}
                        labelInfo={notificationCount}
                    >
                        {/*<StyledTreeItem*/}
                        {/*    nodeId="21"*/}
                        {/*    labelText="個人資料"*/}
                        {/*    labelIcon={InfoIcon}*/}
                        {/*    href="/userInfo"*/}
                        {/*    onClick={toggleDrawerOpen}*/}

                        {/*/>*/}
                        <StyledTreeItem
                            nodeId="22"
                            labelText="通知"
                            labelIcon={NotificationsIcon}
                            labelInfo={notificationCount}
                            onClick={() => {
                                setNotificationCount(0);
                                toggleDrawerOpen()
                            }}
                            href="/notification"
                        />
                        <StyledTreeItem
                            nodeId="23"
                            labelText="追蹤清單"
                            labelIcon={BookmarkIcon}
                            href="/following"
                            onClick={toggleDrawerOpen}
                        />
                        {/*<StyledTreeItem*/}
                        {/*    nodeId="24"*/}
                        {/*    labelText="願望清單"*/}
                        {/*    labelIcon={PlaylistAddIcon}*/}
                        {/*    href="/wishlist"*/}
                        {/*    onClick={toggleDrawerOpen}*/}
                        {/*/>*/}
                        <StyledTreeItem
                            nodeId="25"
                            labelText="已評論店家"
                            labelIcon={CommentIcon}
                            href="/reviewed"
                            onClick={toggleDrawerOpen}
                        />
                        {/*<StyledTreeItem*/}
                        {/*    nodeId="26"*/}
                        {/*    labelText="用戶設定"*/}
                        {/*    labelIcon={SettingsIcon}*/}
                        {/*    href="/setting"*/}
                        {/*    onClick={toggleDrawerOpen}*/}
                        {/*/>*/}
                    </StyledTreeItemHead>
                    <Divider/>
                </>
                }

            </TreeView>
        </Box>
    );
}
