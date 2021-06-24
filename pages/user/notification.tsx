import React, {ChangeEvent, useState} from "react";
import useFetch from "../../customHooks/UseFetch";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {INotification} from "../../types/INotification";
import {Box} from "@material-ui/core";
import CustomPagination from "../../components/CustomerPagination/CustomPagination";
import NotificationStrip from "../../components/NotificationStrip/NotificationStrip";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import withAuth from "../../HOC/withAuth";

const useStyles = makeStyles((theme: Theme) => ({
        root: {
            justifyContent: "center",
            margin: "3rem 0",
            display: "flex",
        },
        header: {
            textAlign: "left",
            float: "none",
            color: "#323232",
            margin: 16,
            fontSize: 24,
        },
        searchRoot: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
        pagination: {
            backgroundColor: "transparent",
            "& ul > li > button": {
                backgroundColor: "white"
            }
        },
        text: {
            textAlign: "left",
            float: "none",
            color: "#323232",
            margin: 16,
            fontSize: 20,
        },
    })
);

type NotificationsRes = {
    notifications: INotification[],
    current: number,
    pages: number
}

const Notification = () => {
    const classes = useStyles();
    const [page, setPage] = useState<number>(1);
    //const {user} = useUser()!;

    const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const options = {
        key: "stores",
        url: process.env.NEXT_PUBLIC_BE_URL + "/api/v1/user/notifications",
        requestQuery: {
            page: page,
        }
    }

    const {data, status, error} = useFetch<NotificationsRes>(options);

    if (status === "loading") {
        return <Loading/>;
    }

    if (status === "error") {
        return <ErrorMessage message={error.message} />;
    }

    return data?.notifications ? <Box mb={5}>

        <p className={classes.header}>通知</p>
        {
            data.notifications.length > 0 ? data.notifications.map((notification: INotification) => {
                return <NotificationStrip notification={notification}/>
            }) : <p className={classes.text}>沒有通知</p>
        }
        <CustomPagination pages={data.pages} page={page} handlePageChange={handlePageChange}/>
    </Box> : null


};
export default withAuth(Notification);
