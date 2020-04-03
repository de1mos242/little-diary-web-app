import {action, decorate, observable} from "mobx";
import {v4 as uuidv4} from 'uuid';

export enum RoleEnum {
    user = "user",
    admin = "admin",
    tech = "tech",
}

export class User {
    username: string = "";
    role: RoleEnum = RoleEnum.user;
    uuid: string = uuidv4();

    static fromObj(json: { uuid: string, role: string, username: string }): User {
        const user = observable(new User());
        user.uuid = json.uuid;
        user.username = json.username;
        user.role = (<any>RoleEnum)[json.role];
        return user;
    }
}

decorate(User.prototype, {
    username: observable,
    role: observable,
    uuid: observable,
});