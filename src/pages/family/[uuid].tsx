import {observer} from "mobx-react";
import React, {useContext, useEffect, useState} from "react";
import {WebAppContext} from "../../webAppContext";
import {Breadcrumb, Button, Confirm, Container, Form, Header, Icon, Input, List, Segment} from "semantic-ui-react";
import {NextPage, NextPageContext} from "next";
import Link from "next/link";
import Router from "next/router";

const FamilyViewPage: NextPage<{ uuid: string }> = observer(({uuid}: { uuid: string }) => {
    const {familyStore} = useContext(WebAppContext);
    const [newFamilyTitle, setNewFamilyTitle] = useState("");
    const [isEditFamilyTitle, setEditFamilyTitle] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
        familyStore.fetchFamilyInfo(uuid);
    }, []);

    if (familyStore.family == null) {
        return null;
    }

    function titlesSame() {
        if (familyStore.family) {
            return familyStore.family.title == newFamilyTitle;
        }
        return false;
    }

    async function saveFamilyTitle() {
        if (familyStore.family?.title && !titlesSame()) {
            await familyStore.saveFamily(newFamilyTitle);
            setEditFamilyTitle(false);
        }
        if (titlesSame()) {
            setEditFamilyTitle(false);
        }
    }

    async function deleteConfirmed() {
        await familyStore.deleteFamily();
        setConfirmDelete(false);
        await Router.push("/families");
    }

    function startEditTitle() {
        if (familyStore.family) {
            setNewFamilyTitle(familyStore.family.title);
            setEditFamilyTitle(true);
        }
    }

    return <Container>
        <Breadcrumb>
            <Breadcrumb.Section><Link href="/families"><a>Families</a></Link></Breadcrumb.Section>
            <Breadcrumb.Divider/>
            <Breadcrumb.Section active>{familyStore.family.title}</Breadcrumb.Section>
        </Breadcrumb>
        <Container>
            {isEditFamilyTitle ?
                <Form>
                    <Input autoFocus action={{
                        icon: titlesSame() ? 'close' : 'save',
                        onClick: saveFamilyTitle,
                        type: 'submit',
                        disabled: !newFamilyTitle
                    }}
                           onChange={e => setNewFamilyTitle(e.target.value)}
                           value={newFamilyTitle}/>
                </Form>
                :
                <List horizontal>
                    <List.Item>
                        <Header size="large">
                            {familyStore.family.title}
                        </Header>
                    </List.Item>
                    <List.Item>
                        <Icon name="edit" size="small" onClick={startEditTitle}/>
                    </List.Item>
                </List>

            }
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
            <Button onClick={() => setConfirmDelete(true)} negative>Delete</Button>
            <Confirm open={confirmDelete}
                     content={`Are you sure to delete family ${familyStore.family?.title}?`}
                     onCancel={() => setConfirmDelete(false)}
                     onConfirm={deleteConfirmed}/>
        </Container>
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