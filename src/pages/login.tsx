import {observer} from "mobx-react";
import {Button, Form, Grid, Header, Segment} from "semantic-ui-react";
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
    return <Grid textAlign="center" style={{height: '100vh'}} verticalAlign="middle">
        <Grid.Column style={{maxWidth: 450}}>
            <Header as='h2' textAlign='center'>
                Log-in to your account
            </Header>
            <Form size="large">
                <Segment>
                    <Form.Input fluid icon="user" iconPosition="left" placeholder="admin"
                                value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <Form.Input fluid icon="lock" type="password" iconPosition="left" placeholder="poiu"
                                value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Button type="submit" fluid size="large" onClick={makeLogin}>Login</Button>
                </Segment>
            </Form>
        </Grid.Column>
    </Grid>
});
export default LoginPage