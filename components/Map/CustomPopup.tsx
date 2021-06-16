import {Popup} from "react-map-gl";
import {IStore} from "../../types/IStore";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {useRouter} from "next/router";

const markerSize = 45;
const useStyles = makeStyles(() => ({
    popup: {
        maxWidth:250,
        padding:10
    },
    storeName:{

    }
}));


type Props = {
    index: number,
    store: IStore,
    closePopup: Function
};

const CustomPopup = (props: Props) => {
    const store = props.store;
    const closePopup = props.closePopup;
    const router = useRouter();
    const classes = useStyles();
    return (
        <Popup
            longitude={store?.location?.coordinates[0]}
            latitude={store?.location?.coordinates[1]}
            onClose={closePopup}
            closeButton={false}
            offsetLeft={markerSize / 2}
            closeOnClick={false}
            className={classes.popup}
        >

            <Button className={classes.storeName} onClick={()=>router.push(`/stores/${store._id}`)}>
                {store.name}
            </Button>
        </Popup>
    )
};

export default CustomPopup;
