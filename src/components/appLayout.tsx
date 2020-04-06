import {observer} from "mobx-react";
import HeaderMenu from "./headerMenu";
import {ErrorMessage} from "./errorMessage";
import {Dimmer, Loader} from "semantic-ui-react";
import {WebAppContext} from "../webAppContext";
import React, {ReactNode, useContext} from "react";

const AppLayout = observer(({children}: { children: ReactNode }) => {
    const {uiStore} = useContext(WebAppContext);
    return <div>
        <HeaderMenu/>
        <ErrorMessage/>
        <Dimmer active={uiStore.isLoading} inverted>
            <Loader size='large'>Loading</Loader>
        </Dimmer>
        {children}
    </div>
})

export default AppLayout