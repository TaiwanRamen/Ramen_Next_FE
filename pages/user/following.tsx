import React, {ChangeEvent, useState} from 'react';
import {IStore} from "../../types/IStore";
import useFetch from "../../customHooks/UseFetch";
import {Box} from "@material-ui/core";
import CustomPagination from "../../components/CustomerPagination/CustomPagination";
import {makeStyles} from "@material-ui/styles";
import FollowingStrip from "../../components/FollowingStrip/FollowingStrip";
import withAuth from "../../HOC/withAuth";

const useStyles = makeStyles(() => ({
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
        text: {
            textAlign: "left",
            float: "none",
            color: "#323232",
            margin: 16,
            fontSize: 20,
        },
        searchRoot: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
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
        }
    })
);

type Stores = {
    current: number;
    pages: number;
    stores: IStore[]
};
const Following = () => {
    const classes = useStyles();
    const [page, setPage] = useState<number>(1);

    const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const options = {
        key: "stores",
        url: process.env.NEXT_PUBLIC_BE_URL + "/api/v1/user/followedStore",
        requestQuery: {
            page: page,
        }
    }
    const {data} = useFetch<Stores>(options);
    return data?.stores ?
        <Box mb={5}>
            <p className={classes.header}>追蹤清單</p>
            {
                data.stores.length > 0 ? data.stores.map((store: IStore) => {
                    return <FollowingStrip store={store}/>
                }) : <p className={classes.text}>沒有追蹤清單</p>
            }
            <CustomPagination pages={data.pages} page={page} handlePageChange={handlePageChange}/>
        </Box> : null
};

export default withAuth(Following);
