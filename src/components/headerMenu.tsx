import {observer} from "mobx-react";
import React, {useContext} from "react";
import {Dropdown, Menu} from "semantic-ui-react";
import {WebAppContext} from "../webAppContext";
import {Container} from "next/app";
import Link from "next/link";

const HeaderMenu = observer(() => {
    const {userStore, authStore} = useContext(WebAppContext);
    return <Menu >
        <Container text>
            <Menu.Item header><Link href="/"><a>Little diary</a></Link></Menu.Item>
            <Menu.Menu position="right">
                {userStore.isLoggedIn ?
                    <Dropdown text={userStore.currentUser?.username} pointing className='link item'>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => authStore.logout()}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> :
                    <Menu.Item><Link href="/login"><a>Login</a></Link></Menu.Item>
                }
            </Menu.Menu>
        </Container>
    </Menu>
});

export default HeaderMenu