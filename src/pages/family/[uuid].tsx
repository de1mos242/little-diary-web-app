import {observer} from "mobx-react";
import React, {useContext, useEffect} from "react";
import {WebAppContext} from "../../webAppContext";
import {Breadcrumb, Container, Header, List, Segment} from "semantic-ui-react";
import {NextPage, NextPageContext} from "next";
import Link from "next/link";

const FamilyViewPage: NextPage<{ uuid: string }> = observer(({uuid}: { uuid: string }) => {
    const {familyStore} = useContext(WebAppContext);
    useEffect(() => {
        familyStore.fetchFamilyInfo(uuid);
    }, []);

    if (familyStore.family == null) {
        return null;
    }

    return <Container>
        <Breadcrumb>
            <Breadcrumb.Section><Link href="/families"><a>Families</a></Link></Breadcrumb.Section>
            <Breadcrumb.Divider/>
            <Breadcrumb.Section active>{familyStore.family?.title}</Breadcrumb.Section>
        </Breadcrumb>
        <Segment raised>
            <Header size="small">Babies</Header>
            <List divided relaxed>
                {familyStore.family.babies.map((b) =>
                    <List.Item key={b.uuid}>
                        <List.Icon name="child" size="large" verticalAlign="middle"/>
                        <List.Content>
                            <List.Header>{b.firstName}</List.Header>
                            <List.Description>{b.dateOfBirth.toLocaleDateString()}</List.Description>
                        </List.Content>
                    </List.Item>
                )}
            </List>
        </Segment>
        <Segment raised>
            <Header size="small">Members</Header>
            <List divided relaxed>
                {familyStore.family.members.map((m) =>
                    <List.Item key={m.uuid}>
                        <List.Icon name="user" size="large" verticalAlign="middle"/>
                        <List.Content>
                            <List.Header>{m.user.username}</List.Header>
                        </List.Content>
                    </List.Item>
                )}
            </List>
        </Segment>
    </Container>
});

FamilyViewPage.getInitialProps = async (ctx: NextPageContext) => {
    let familyUuid: string = "";
    if (typeof ctx.query.uuid === 'string') {
        familyUuid = ctx.query.uuid;
    }
    return {uuid: familyUuid};
};

export default FamilyViewPage;