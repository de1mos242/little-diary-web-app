import {observer} from "mobx-react";
import {Header} from "semantic-ui-react";
import Link from "next/link";
import React, {useContext} from "react";
import {WebAppContext} from "../webAppContext";
import Router from "next/router";

export default observer(() => {
    const {userStore} = useContext(WebAppContext);
    if (userStore.isLoggedIn) {
        Router.push("/families");
        return null;
    }
    return <div>
        <Header as="h3">Here you can manage diaries for you children.</Header>

        <Header as="sub">
            In order to perform any actions you should
            {' '}
            <Link href="/login"><a>login</a></Link>
            {' '}
            first
        </Header>
    </div>
})