import App from 'next/app'
import React from "react";
import {WebAppContext} from "../webAppContext";
import 'semantic-ui-css/semantic.min.css'
import {getRootStore} from "../stores/rootStore";
import AppLayout from "../components/appLayout";
import {AppConfig} from "../appConfig";
import {AppContext} from "next/dist/pages/_app";

class MyApp extends App {
    static async getInitialProps({Component, ctx}: AppContext) {
        let appConfig = new AppConfig();
        let pageProps = {}
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        return {
            pageProps: {
                ...pageProps,
                appConfig: appConfig.convertToObj()
            }
        };
    }

    render(): JSX.Element {
        const {Component, pageProps} = this.props;
        const config = AppConfig.convertFromObject(pageProps.appConfig);
        return <WebAppContext.Provider value={getRootStore(config)}>
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </WebAppContext.Provider>
    }
}

export default MyApp