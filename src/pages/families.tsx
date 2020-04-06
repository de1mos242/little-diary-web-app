import {observer} from "mobx-react";
import React, {useContext, useEffect} from "react";
import {WebAppContext} from "../webAppContext";
import {Breadcrumb, Button, Container, Header, List} from "semantic-ui-react";
import FamilyListRow from "../components/familyListRow";
import Link from "next/link";

export default observer(() => {
    const {familiesStore} = useContext(WebAppContext);

    useEffect(() => {
        familiesStore.fetchFamilies();
    }, []);

    return <Container>
        <Breadcrumb>
            <Breadcrumb.Section active>Families</Breadcrumb.Section>
        </Breadcrumb>
        {familiesStore.hasFamilies ?
            <List divided relaxed>
                {familiesStore.families.map((f) => <FamilyListRow family={f} key={f.uuid}/>)}
            </List> :
            <Header as="sub">You don't have access to any families yet, try to fill a family</Header>}
        <Button primary><Link href="/family/new"><a>New family</a></Link> </Button>
    </Container>
})