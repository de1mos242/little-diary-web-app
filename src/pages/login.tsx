import {observer} from "mobx-react";
import {Button, Container as UiContainer, Form, Header, Input} from "semantic-ui-react";
import React, {useContext, useState} from "react";
import {WebAppContext} from "../webAppContext";
import Router from "next/router";

const LoginPage = observer(() => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {authStore, userStore} = useContext(WebAppContext);

    const makeLogin = () => {
        authStore.login(username, password);
    };
    if (userStore.isLoggedIn) {
        Router.push("/");
        return null;
    }
    return <div>
        <Header as='h3' textAlign='center' content='Container'/>
        <UiContainer>
            <Form>
                <Form.Field>
                    <label>Username</label>
                    <Input placeholder="admin" value={username}
                           onChange={(e) => setUsername(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <Input placeholder="poiu" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </Form.Field>
                <Button type="submit" onClick={makeLogin}>Login</Button>
            </Form>
        </UiContainer>
    </div>
});
export default LoginPage