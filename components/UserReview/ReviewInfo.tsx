import useFetch from "../../customHooks/UseFetch";
import Loading from "../Loading/Loading";
import {IReview} from "../../types/IReview";
import ListItem from "@material-ui/core/ListItem";
import {makeStyles, Theme} from "@material-ui/core/styles";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import he from "he";
import * as React from "react";
import {useRouter} from "next/router";

const useStyles = makeStyles((theme: Theme) => ({
    selection: {
        fontFamily: "JFOpen",
        fontSize: "1rem",
        color: theme.palette.text.primary,
        "&:hover": {
            backgroundColor: "#efefef",
            color: theme.palette.text.primary,
            textDecoration: "none",
        }
    },
    reviewText: {
        "& > div.ql-editor": {
            fontSize: "1rem",
        },
        "& > div.ql-tooltip": {
            height: 0
        },
        "&:hover": {
            cursor: "pointer"
        }
    }
}))
type UserReviewRes = {
    review: IReview | null
}
type Props = {
    storeId: string
}
const ReviewInfo = (props: Props) => {
    const storeId = props.storeId;
    const classes = useStyles();
    const router = useRouter();

    const options = {
        key: "userReview",
        url: process.env.NEXT_PUBLIC_BE_URL + `/api/v1/reviews/userReview/${storeId}`,
        requestQuery: {}
    }
    const {data, status, error} = useFetch<UserReviewRes>(options);

    if (status === "loading") {
        return <Loading iconSize={40} fontSize={"15px"}/>;
    }

    if (status === "error") {
        return <div>{error?.message}</div>;
    }

    return data?.review ? (
        <ListItem className={classes.selection} button onClick={() => router.push(`/stores/${storeId}`)}>
            <ReactQuill
                value={he.decode(data.review.text)}
                readOnly={true}
                theme={"bubble"}
            >
                <div className={classes.reviewText}/>
            </ReactQuill>
        </ListItem>
    ) : null;
};

export default ReviewInfo;
