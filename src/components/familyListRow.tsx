import {observer} from "mobx-react";
import {Family} from "../models/family";
import Link from "next/link";
import React from "react";
import {List} from "semantic-ui-react";

const FamilyListRow = observer(({family}: { family: Family }) => {
    return <List.Item key={family.uuid}>
        <List.Icon name="users" size="large" verticalAlign="middle"/>
        <List.Content key={family.uuid}>
            <List.Header key={family.uuid}>
                <Link href="/family/[uuid]" as={`/family/${family.uuid}`}><a>{family.title}</a></Link>
            </List.Header>
        </List.Content>
    </List.Item>
});

export default FamilyListRow