import {FamilyMember} from "./familyMember";
import {Baby} from "./baby";
import {FamilyDto, FamilyShortDto} from "../dtos/family";
import {decorate, observable} from "mobx";
import {User} from "./user";

export class Family {
    title: string;
    uuid: string;
    members: FamilyMember[];
    babies: Baby[];

    constructor(title: string, uuid: string, members?: FamilyMember[], babies?: Baby[]) {
        this.title = title;
        this.uuid = uuid;
        this.members = members || [];
        this.babies = babies || [];
    }

    static fromJson(json: FamilyShortDto) {
        return new Family(json.title, json.uuid);
    }

    updateNested(json: FamilyDto, users: User[]) {
        const usersMap = new Map(users.map(u => [u.uuid, u]));
        const getUserFromMap = (userUuid: string) => {
            const u = usersMap.get(userUuid);
            if (u == null) {
                throw new Error(`User with uuid ${userUuid} not found`);
            }
            return u;
        };

        this.babies = json.babies.map((b) => new Baby(b.first_name, new Date(b.date_of_birth), b.uuid));
        this.members = json.members.map((m) => new FamilyMember(m.uuid, m.user_uuid, getUserFromMap(m.user_uuid)));
    }
}

decorate(Family.prototype, {
    title: observable,
    uuid: observable,
    members: observable,
    babies: observable,
});