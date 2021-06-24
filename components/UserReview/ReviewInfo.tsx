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
import {Paper} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    paper:{
        width: "100%",
        backgroundColor: "#fafafa",
        boxShadow: "1px 1px 3px 1px rgba(0, 0, 0, 0.2)",
        borderRadius: 5,
        padding: 20,
        paddingTop: 0,
        "&::before": {
            content: '""',
            position: "relative",
            top: -30,
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderBottom: "10px solid #efefef",
        },
    },
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
            cursor: "pointer",
            fontSize: "1rem",
        },
        "& > div.ql-tooltip": {
            display: "none",
            height: 0
        },
        "& > div.ql-clipboard": {
            display: "none",
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
            <Paper className={classes.paper}>
                <ReactQuill
                    value={he.decode(data.review.text)}
                    readOnly={true}
                    theme={"bubble"}
                >
                    <div className={classes.reviewText}/>
                </ReactQuill>
            </Paper>
        </ListItem>
    ) : null;
};

export default ReviewInfo;
