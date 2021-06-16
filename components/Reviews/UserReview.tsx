import useFetch from "../../customHooks/UseFetch";
import {IReview} from "../../types/IReview";
import Loading from "../Loading/Loading";
import Review from "./Review";
import RateReviewIcon from "@material-ui/icons/RateReview";
import {Box, Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {useRouter} from "next/router";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const useStyles = makeStyles(() => ({
    add: {
        margin: 20
    }
}))
type UserReviewRes = {
    review: IReview | null
}

type Props = {
    storeId: string
}
const UserReview = (props: Props) => {
    const classes = useStyles();
    const router = useRouter();
    const storeId = props.storeId;
    const options = {
        key: "userReview",
        url: process.env.NEXT_PUBLIC_BE_URL + `/api/v1/reviews/userReview/${storeId}`,
        requestQuery: {}
    }
    const {data, status, error} = useFetch<UserReviewRes>(options);

    if (status === "loading") {
        return <Loading/>;
    }

    if (status === "error") {
        return <ErrorMessage message={error.message} />;
    }
    if (!data?.review) return (
        <Box mt={1}>
            <Typography variant="body1">
                您尚未評論：
            </Typography>
            <Button
                size="large"
                variant="outlined"
                color="primary"
                startIcon={<RateReviewIcon/>}
                onClick={() => router.push(`/stores/${storeId}/newReview`)}
                className={classes.add}
            >
                新增 食記/評論
            </Button>
        </Box>
    )

    return (
        <Box mt={1}>
            <Typography variant="body1">
                您的評論：
            </Typography>
            <Review review={data.review} key={data.review._id} storeId={storeId}/>
        </Box>
    );
};

export default UserReview;
