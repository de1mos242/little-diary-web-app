import {observable} from "mobx";
import {v4 as uuidv4} from 'uuid';

export enum RoleEnum {
    user = "user",
    admin = "admin",
    tech = "tech",
}

export class User {
    @observable
    username: string = "";

    @observable
    role: RoleEnum = RoleEnum.user;

    @observable
    uuid: string = uuidv4();

    static fromObj(json: { uuid: string, role?: string, username: string }): User {
        const user = observable(new User());
        user.uuid = json.uuid;
        user.username = json.username;
        user.role = json.role ? (<any>RoleEnum)[json.role] : null;
        return user;
    }
}