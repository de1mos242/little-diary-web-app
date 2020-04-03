import {observer} from "mobx-react";
import {Header} from "semantic-ui-react";
import Link from "next/link";
import React, {useContext} from "react";
import {WebAppContext} from "../webAppContext";

export default observer(() => {
    const {userStore} = useContext(WebAppContext);
    return <div>
        {userStore.isLoggedIn ?
            <Header as="h1"> Welcome back, {userStore.currentUser?.username}</Header> :
            <Header as="h1">Welcome to Little diary.</Header>
        }
        <Header as="h3">Here you can manage diaries for you children.</Header>

        {!userStore.isLoggedIn && <Header as="sub"> In order to perform any actions you should
            {' '}
            <Link href="/login"><a>login</a></Link>
            {' '}
            first</Header>}
    </div>
})