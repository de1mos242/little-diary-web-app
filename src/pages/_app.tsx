import {AppProps} from 'next/app'
import React from "react";
import {rootStore, WebAppContext} from "../webAppContext";
import 'semantic-ui-css/semantic.min.css'
import HeaderMenu from "../components/headerMenu";
import {ErrorMessage} from "../components/errorMessage";

function MyApp({Component, pageProps}: AppProps) {
    return <WebAppContext.Provider value={rootStore}>
        <HeaderMenu/>
        <ErrorMessage/>
        <Component {...pageProps} />
    </WebAppContext.Provider>
}

export default MyApp