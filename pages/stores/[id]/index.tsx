import {useRouter} from "next/router";
import React from "react";
import {IStore} from "../../../types/IStore";
import useFetch from "../../../customHooks/UseFetch";
import Loading from "../../../components/Loading/Loading";
import {Grid} from "@material-ui/core";
import StoreLeftCol from "../../../components/Store/StoreLeftCol";
import StoreRightCol from "../../../components/Store/StoreRightCol";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import {StoreProvider} from "../../../context/StoreContext";
import withAuth from "../../../HOC/withAuth";
type StoreResponse = {
    isStoreOwner: boolean,
    store: IStore
}

const Store = () => {
    const router = useRouter();
    const {id} = router.query;
    const [currentTabNum, setCurrentTabNum] = React.useState(0);

    const options = {
        key: "store",
        url: process.env.NEXT_PUBLIC_BE_URL + `/api/v1/stores/${id}`,
        requestQuery: {},
        enabled: id !== undefined
    }

    const {data, status, error} = useFetch<StoreResponse>(options);


    if (status === "loading") {
        return <Loading/>;
    }

    if (status === "error") {
        return <ErrorMessage message={error.message}/>;
    }


    return data ?
        <Grid container direction="row" justify="space-between" spacing={3}>
            <StoreProvider>
                <Grid key={"leftCol"} item sm={12} md={3}>
                    <StoreLeftCol store={data.store} currentTabNum={currentTabNum} setCurrentTabNum={setCurrentTabNum}/>
                </Grid>
                <Grid key={"rightCol"} item sm={12} md={9}>

                    <StoreRightCol data={data} currentTabNum={currentTabNum} setCurrentTabNum={setCurrentTabNum}/>
                </Grid>
            </StoreProvider>
        </Grid>
        : null;
};

export default withAuth(Store);