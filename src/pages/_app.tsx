import App from 'next/app'
import React from "react";
import {WebAppContext} from "../webAppContext";
import 'semantic-ui-css/semantic.min.css'
import {getRootStore} from "../stores/rootStore";
import AppLayout from "../components/appLayout";

class MyApp extends App {
    render(): JSX.Element {
        const {Component, pageProps} = this.props;

        return <WebAppContext.Provider value={getRootStore()}>
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </WebAppContext.Provider>
    }
}

export default MyApp