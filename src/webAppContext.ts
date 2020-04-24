import * as React from "react";
import {getRootStore} from "./stores/rootStore";
import {AppConfig} from "./appConfig";

export const rootStore = getRootStore(new AppConfig());

export const WebAppContext = React.createContext(rootStore);