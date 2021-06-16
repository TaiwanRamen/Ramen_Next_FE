import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Head from "next/head";
import * as React from 'react';
import axios from "axios";
import {SnackbarProvider} from 'notistack';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Grow} from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import {UserProvider} from "../context/UserContext";
import ScrollToTop from "../customHooks/ScrollToTop";
import {NotificationProvider} from "../context/NotificationContext";
import RamenNavbar from "../components/RamenNavbar/RamenNavbar";
import MainLayout from "../components/MainLayout/MainLayout";
import { DefaultSeo } from 'next-seo';
// import SEO from '../next-seo.config';
import NetworkInterceptors from "../utils/NetworkInterceptors";


function MyApp({Component, pageProps}) {

    const [queryClient] = React.useState(() => new QueryClient())
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return <>
        <Head>
            <link rel="icon" href="/favicon.png"/>
            <title>台灣拉麵倶樂部</title>
        </Head>
        <CssBaseline />

        <SnackbarProvider
            maxSnack={3}
            TransitionComponent={Grow}
        >
            <NetworkInterceptors>
                <QueryClientProvider client={queryClient}>
                    <UserProvider>
                        <>
                            <NotificationProvider>
                                <RamenNavbar/>
                            </NotificationProvider>
                            <ScrollToTop/>
                            <MainLayout>
                                {/*<DefaultSeo {...SEO} />*/}
                                <Component {...pageProps} />
                            </MainLayout>
                        </>
                    </UserProvider>
                </QueryClientProvider>
            </NetworkInterceptors>
        </SnackbarProvider>
    </>
}

export default MyApp
