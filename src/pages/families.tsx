import {observer} from "mobx-react";
import React, {useContext, useEffect, useState} from "react";
import {WebAppContext} from "../webAppContext";
import {Breadcrumb, Button, Container, Form, Header, Input, List} from "semantic-ui-react";
import FamilyListRow from "../components/familyListRow";

export default observer(() => {
    const {familiesStore} = useContext(WebAppContext);
    const [newFamilyTitle, setNewFamilyTitle] = useState("");
    const [isNewFamily, setIsNewFamily] = useState(false);


    useEffect(() => {
        familiesStore.fetchFamilies();
    }, []);

    async function onAddNewFamily() {
        if (newFamilyTitle) {
            await familiesStore.addNewFamily(newFamilyTitle);
            setIsNewFamily(false);
            setNewFamilyTitle("");
        }
    }

    return <Container>
        <Breadcrumb>
            <Breadcrumb.Section active>Families</Breadcrumb.Section>
        </Breadcrumb>
        {familiesStore.hasFamilies ?
            <List divided relaxed>
                {familiesStore.families.map((f) => <FamilyListRow family={f} key={f.uuid}/>)}
            </List> :
            <Header as="sub">You don't have access to any families yet, try to fill a family</Header>}
        {isNewFamily ?
            <Form>
                <Input autoFocus
                       action={{content: 'Add', onClick: onAddNewFamily, type: 'submit', disabled: !newFamilyTitle}}
                       onChange={e => setNewFamilyTitle(e.target.value)}
                       value={newFamilyTitle}/>
            </Form> :
            <Button primary onClick={() => setIsNewFamily(true)}>New family</Button>}
    </Container>
})