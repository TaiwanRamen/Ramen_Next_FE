import useFetch from "../../customHooks/UseFetch";
import Loading from "../Loading/Loading";
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";
import MetroTag from "./MetroTag";
import ErrorMessage from "../ErrorMessage/ErrorMessage";


type Metros = {
    stations: {
        city: string,
        lineCode: string[],
        name: string,
        distance: number
    }[]
}
type Props = {
    storeId: string,
}
const CloseToMetro = (props: Props) => {
    const storeId = props.storeId;

    const options = {
        key: "stores",
        url: process.env.NEXT_PUBLIC_BE_URL + `/api/v1/metro/getMetroCloseToStore`,
        requestQuery: {storeId}
    }
    const {data, status, error} = useFetch<Metros>(options);

    if (status === "loading") {
        return <Loading fontSize={"1rem"} iconSize={50}/>;
    }

    if (status === "error") {
        return <ErrorMessage message={error.message} />;
    }
    return data?.stations && data?.stations.length > 0 ?
        <Box>
            <Typography color={'textSecondary'} variant={'body2'}>
                鄰近捷運站：
            </Typography>
            {data.stations.map(station => <MetroTag station={station}/>)}
        </Box> : null

};

export default CloseToMetro;
