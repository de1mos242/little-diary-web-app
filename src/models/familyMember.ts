import {User} from "./user";
import {observable} from "mobx";

export class FamilyMember {
    @observable
    uuid: string;
    @observable
    user: User;
    @observable
    userUuid: string;


    constructor(uuid: string, userUuid: string, user: User) {
        this.uuid = uuid;
        this.userUuid = userUuid;
        this.user = user;
    }
}