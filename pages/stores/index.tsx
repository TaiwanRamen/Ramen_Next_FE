import React, {ChangeEvent, useState} from 'react';
import {IStore} from "../../types/IStore";
import Loading from "../../components/Loading/Loading";
import useFetch from "../../customHooks/UseFetch";
import {Button} from "@material-ui/core";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import SearchBar from "../../components/SearchBar/SearchBar";
import StoreCardList from "../../components/StoreCard/StoreCardList";
import CustomPagination from "../../components/CustomerPagination/CustomPagination";
import {QueryClient} from "react-query";
import {dehydrate} from "react-query/hydration";
import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import withAuth from "../../HOC/withAuth";


type Stores = {
    current: number;
    pages: number;
    search: boolean;
    stores: IStore[]
};
const Stores = () => {
    const [page, setPage] = useState<number>(1);
    const [searchInput, setSearchInput] = useState<string | null>(null);

    const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const options = {
        key: "stores",
        url: process.env.NEXT_PUBLIC_BE_URL + "/api/v1/stores",
        requestQuery: {
            page: page,
            search: searchInput
        }
    }

    const {data, status, error} = useFetch<Stores>(options);


    if (status === "loading") {
        return <Loading/>;
    }

    if (status === "error") {
        return <ErrorMessage message={error.message} />;
    }
    if (data?.stores?.length === 0) {
        return searchInput ? <div>
            {`搜尋"${searchInput}"沒有找到店家`}
            <Button variant="outlined" className="goBack-btn" onClick={() => setSearchInput(null)}>
                <ArrowLeftIcon/>
                返回店家列表
            </Button>
        </div> : <div>沒有找到店家</div>
    }

    return data ?
        <>
            <SearchBar setPage={setPage} setSearchInput={setSearchInput}/>
            <StoreCardList stores={data.stores}/>

            {data && <CustomPagination pages={data.pages} page={page} handlePageChange={handlePageChange}/>}

        </> : null;
};

export default withAuth(Stores);
//
// export async function getStaticProps() {
//     const queryClient = new QueryClient()
//
//     const getStores = async (url: string, params: Object): Promise<any> => {
//         try {
//             const response = await axios.get(url, {params: params, withCredentials: true});
//             return await response.data.data;
//         } catch (error) {
//             throw new Error("Problem fetching data, please retry later");
//         }
//     }
//
//     await queryClient.prefetchQuery('stores', getStores())
//
//     return {
//         props: {
//             dehydratedState: dehydrate(queryClient),
//         },
//     }
// }
