import {observer} from "mobx-react";
import React, {useContext} from "react";
import {WebAppContext} from "../webAppContext";
import {Message} from "semantic-ui-react";

export const ErrorMessage = observer(() => {
    const {uiStore} = useContext(WebAppContext);
    if (uiStore.hasErrorMessage) {
        return <Message floating negative onDismiss={() => uiStore.hideError()}>
            {uiStore.errorMessage}
        </Message>
    }
    return null;
});