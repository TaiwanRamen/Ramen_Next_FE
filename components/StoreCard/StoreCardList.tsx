import StoreCard from "./StoreCard";
import Loading from "../Loading/Loading";
import Grid from '@material-ui/core/Grid';
import {IStore} from "../../types/IStore";

type Props = {
    stores: IStore[]
}

const StoreCardList = (props: Props) => {
    const stores = props.stores;

    return (

        <Grid container direction="row" justify="flex-start" alignItems="center" spacing={5}>
            {!stores && <Loading/>}
            {stores && stores.map(store =>
                <Grid key={store._id} item xs={12} sm={12} md={6} lg={4}>
                    <StoreCard store={store}/>
                </Grid>
            )}
        </Grid>

    );
}

export default StoreCardList;

