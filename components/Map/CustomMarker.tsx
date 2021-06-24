import {Marker} from "react-map-gl";
import {makeStyles} from "@material-ui/core/styles";
import {IStore} from "../../types/IStore";

const iconSize = 40;
const useStyles = makeStyles(() => ({
    marker: {
        transform: `translate(${-iconSize / 2}px,${-iconSize}px)`,
        backgroundSize: "cover",
        width: iconSize,
        height: iconSize,
        borderRadius: "50%",
        cursor: "pointer",
        zIndex: 600
    },
}))

type Props = {
    index: number,
    store: IStore,
    openPopup: Function,
    flyTo: Function
}

const CustomMarker = (props: Props) => {
    const store = props.store;
    const index = props.index;
    const openPopup = props.openPopup;
    const flyTo = props.flyTo;
    const lng = store?.location?.coordinates[0];
    const lat = store?.location?.coordinates[1];
    const classes = useStyles();

    const handleMarkerClick = () => {
        flyTo(lng, lat);
        openPopup(index);
    }
    return (

        <Marker
            latitude={lat}
            longitude={lng}>
            <div  style={{transform: `translate(${-iconSize / 2}px,${-iconSize}px)`}}
                 onClick={handleMarkerClick}>
                <img
                    className={classes.marker}
                    src={'/ramen.svg'}
                    alt="icon"
                />
            </div>
        </Marker>
    )
};

export default CustomMarker;
