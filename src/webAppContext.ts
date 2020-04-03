import * as React from "react";
import {RootStore} from "./stores/rootStore";

export const rootStore = new RootStore();

export const WebAppContext = React.createContext(rootStore);