import App from 'next/app'
import React from "react";
import {WebAppContext} from "../webAppContext";
import 'semantic-ui-css/semantic.min.css'
import HeaderMenu from "../components/headerMenu";
import {ErrorMessage} from "../components/errorMessage";
import {getRootStore} from "../stores/rootStore";

class MyApp extends App {
    render(): JSX.Element {
        const {Component, pageProps} = this.props;

        return <WebAppContext.Provider value={getRootStore()}>
            <HeaderMenu/>
            <ErrorMessage/>
            <Component {...pageProps} />

        </WebAppContext.Provider>
    }
}

export default MyApp