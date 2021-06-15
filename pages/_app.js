import '../styles/globals.css'
import Head from "next/head";
import {SnackbarProvider} from 'notistack';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Grow} from "@material-ui/core";
import {UserProvider} from "../context/UserContext";
import ScrollToTop from "../customHooks/ScrollToTop";
import {NotificationProvider} from "../context/NotificationContext";
import RamenNavbar from "../components/RamenNavbar/RamenNavbar";

const queryClient = new QueryClient();

function MyApp({Component, pageProps}) {

    return <>
        <Head>
            <link rel="icon" href="/favicon.png"/>
            <title>台灣拉麵倶樂部</title>
        </Head>

        <SnackbarProvider
            maxSnack={3}
            TransitionComponent={Grow}
        >
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    {/*<NotificationProvider>*/}
                    {/*    <RamenNavbar/>*/}
                    {/*</NotificationProvider>*/}
                    {/*<>*/}
                    {/*    <ScrollToTop/>*/}

                        <RamenNavbar/>
                        <Component {...pageProps} />
                    {/*</>*/}
                </UserProvider>
            </QueryClientProvider>
        </SnackbarProvider>
    </>
}

export default MyApp
