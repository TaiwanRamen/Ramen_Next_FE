import {Box, Button} from "@material-ui/core";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDoubleLeft, faStoreAlt} from "@fortawesome/free-solid-svg-icons";
import {makeStyles} from "@material-ui/core/styles";
import ReactMapGL, {Marker} from "react-map-gl";
import {IStore} from "../../types/IStore";
import React, {useState} from "react";
import Paper from "@material-ui/core/Paper";
import {Tab, Tabs} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {useRouter} from "next/router";
import CloseToMetro from "../CloseToMetro/CloseToMetro";
import OpeningHours from "./OpeningHours";

const useStyles = makeStyles(() => ({
    root: {
        padding: 10,
        borderRadius: 10,
    },
    backButton: {
        marginTop: 20,
        marginBottom: "rem",
        width: "100%",
        "&:hover": {
            backgroundColor: "#efefef",
            boxShadow: '0 3px 7px 2px rgba(0,0,0,0.1)'
        },
    },
    back: {
        margin: 5,
    },
    storeMap: {
        borderRadius: 20,
        marginTop: 20,
        height: 500,
    },
    map: {
        borderRadius: 10
    },
    address: {
        marginTop: 20
    },
    addressLink: {},
    marker: {
        backgroundImage: `url(/ramen.svg)`,
        backgroundSize: "cover",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        zIndex: 600
    },
    tabs: {
        margin: "10px 0",
        color: "black",
        backgroundColor: 'white',
        boxShadow: "none",
        "& > div > span": {
            width: 5
        },
        "& > div > div > button": {
            border: "1px solid rgba(0, 0, 0, 0.23)",
            borderRadius: "5px"
        },
        "& > div > div > button:hover": {
            backgroundColor: "#efefef",
            boxShadow: '0 3px 7px 2px rgba(0,0,0,0.1)'
        },
    },
}));
type Props = {
    currentTabNum: number,
    setCurrentTabNum: Function,
    store: IStore
}
const StoreLeftCol = (props: Props) => {
    const currentTabNum = props.currentTabNum;
    const setCurrentTabNum = props.setCurrentTabNum;
    const router = useRouter();
    const classes = useStyles();
    const store = props.store;
    const lng = store?.location?.coordinates[0];
    const lat = store?.location?.coordinates[1];
    const openPeriod = store?.openPeriod;
    const defaultViewport = {latitude: lat, longitude: lng, zoom: 12};
    const [viewport, setViewport] = useState<any>(defaultViewport);

    const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTabNum(newValue);
    };
    return (
        <Paper className={classes.root}>

            <Button variant="outlined" className={classes.backButton} onClick={() => router.back()}>
                <FontAwesomeIcon icon={faAngleDoubleLeft}/>
                <span className={classes.back}>返回上一頁</span>
            </Button>
            <Button variant="outlined" className={classes.backButton} onClick={() => router.push('/stores')}>
                <FontAwesomeIcon icon={faStoreAlt}/>
                <span className={classes.back}>店家列表</span>
            </Button>

            <Tabs
                value={currentTabNum}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                orientation="vertical"
                className={classes.tabs}
            >
                <Tab label="店家介紹"/>
                <Tab label="食記/評論"/>
            </Tabs>

            <div id="map" className={classes.storeMap}>
                <ReactMapGL
                    {...viewport}
                    onViewportChange={setViewport}
                    width="100%"
                    height="100%"
                    mapStyle="mapbox://styles/mapbox/streets-v10"
                    mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                    doubleClickZoom={false}
                    className={classes.map}
                >
                    <Marker
                        longitude={lng}
                        latitude={lat}>
                        <div className={classes.marker}>
                        </div>
                    </Marker>
                </ReactMapGL>
            </div>
            <Box mt={2}>
                <Typography color={'textSecondary'} variant={'body2'}>
                    地址：
                    <a className={classes.addressLink} href={`https://www.google.com.tw/maps/place/${store.address}`}>
                        {store.address}
                    </a>
                </Typography>
            </Box>

            {openPeriod &&<OpeningHours openPeriod={openPeriod}/>}

            <Box mt={2}>
                <CloseToMetro storeId={store._id}/>
            </Box>


        </Paper>
    );
};

export default StoreLeftCol;
