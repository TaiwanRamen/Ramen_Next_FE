import React from "react";
import {useState, useRef, useLayoutEffect, useEffect,} from "react";

React.useLayoutEffect = React.useEffect
import dynamic from 'next/dynamic';

const ImageMapper = dynamic(() => import("react-img-mapper"), {ssr: false});
import MapAreas from '../../components/MetroMap/KaohsiungMetroMapAreas'
import {makeStyles, Theme} from "@material-ui/core/styles";
import Loading from "../../components/Loading/Loading";
import MetroMapPopper from "../../components/MetroMap/MetroMapPopper";
import MetroSideDrawer from "../../components/MetroMap/MetroSideDrawer";
import withAuth from "../../HOC/withAuth";
import {Box, Typography} from "@material-ui/core";

const imageWidth = 1110;


function useWindowSize(targetRef: React.RefObject<any>, setMapAreas: React.Dispatch<any>) {
    const [size, setSize] = useState({width: 0, height: 0});
    useLayoutEffect(() => {

        function updateSize() {
            setSize({width: targetRef.current.offsetWidth, height: targetRef.current.offsetHeight});
            setMapAreas(resize(targetRef.current.offsetWidth));
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

const resize = (currentWidth: number) => {
    const factor = currentWidth / imageWidth;
    const oldMapAreas = JSON.parse(JSON.stringify(MapAreas.areas));
    for (let i = 0; i < oldMapAreas.length; i++) {
        let coords = oldMapAreas[i].coords;
        coords = coords.map((c: number) => c * factor);
        oldMapAreas[i].coords = coords;
    }
    return {name: "my-map", areas: JSON.parse(JSON.stringify(oldMapAreas))};
}

const useStyles = makeStyles((theme: Theme) => ({
        presenter: {
            maxWidth: "1110px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        imageDiv: {
            height: "auto",
            maxWidth: "1110px",
            '& > div > map > area:hover': {
                cursor: "pointer",
            },
        },
        typography: {
            padding: theme.spacing(2),
        },
        title: {
            textAlign: "center"
        }
    }),
);

const KaohsiungMetro = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [clickedStationName, setClickedStationName] = useState("");
    const [stationCode, setStationCode] = useState<string>("");
    const [hoverStationName, setHoverStationName] = useState("");

    const [mapAreas, setMapAreas] = useState<any>(MapAreas);

    const [popoverPosition, setPopoverPosition] = useState({left: 800, top: 300})
    const [drawerOpen, setDrawerOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const targetRef = useRef<HTMLDivElement>(null)
    const {width} = useWindowSize(targetRef, setMapAreas);
    // const width2 = 1284;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);


    useEffect(() => {
        setIsLoading(false);
    }, [])

    const handleClick = (area: any) => {
        setClickedStationName(area.name);
        setStationCode(area.code);
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const toggleDrawerOpen = () => {
        setDrawerOpen(!drawerOpen)
    };
    const handleEnter = (area: any, targetRef: React.RefObject<any>) => {
        const centerCoords = {
            left: area.center[0] + targetRef.current.offsetLeft,
            top: area.center[1] + targetRef.current.offsetTop
        };
        setHoverStationName(`${area.name}`)
        setPopoverPosition(centerCoords);
        setOpen(true);
    };
    const handleLeave = () => {
        setHoverStationName("");
        setOpen(false);
    };

    return (
        <Box>
            <Box mb={2} className={classes.title}>
                <Box mb={0.5}>
                    <Typography variant="h4">
                        高雄捷運地圖
                    </Typography>
                </Box>
                <Typography variant="body1" color="textSecondary">
                    請點擊捷運站點查詢附近店家
                </Typography>
            </Box>
            {isLoading && <Loading/>}
            <div id="bird"
                 style={{position: 'absolute', left: popoverPosition.left, top: popoverPosition.top - 40, zIndex: 9999}}
                 ref={anchorRef}>
            </div>
            <div className={classes.presenter} ref={targetRef}>
                <div className={classes.imageDiv}>
                    <ImageMapper
                        src={"/KSMetro.jpeg"}
                        map={mapAreas}
                        width={width}
                        imgWidth={width}
                        onClick={(area: any) => handleClick(area)}
                        onMouseEnter={(area, _) => handleEnter(area, targetRef)}
                        onMouseLeave={() => handleLeave()}
                        onImageClick={handleDrawerClose}
                        lineWidth={0.01}
                        fillColor={"rgba(0, 0, 0, 0.15)"}
                        strokeColor={"white"}
                    />
                </div>

                <MetroMapPopper open={open} anchorEl={anchorRef} hoverStationName={hoverStationName}/>


            </div>
            <MetroSideDrawer city={"kaohsiung"}
                             stationName={clickedStationName}
                             stationCode={stationCode}
                             isOpen={drawerOpen}
                             toggleDrawerOpen={toggleDrawerOpen}
            />
        </Box>
    );

};

export default withAuth(KaohsiungMetro);