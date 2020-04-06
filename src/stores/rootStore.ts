import {UserStore} from "./userStore";
import {UiStore} from "./uiStore";
import {AuthApi} from "../api/authApi";
import {AuthStore} from "./authStore";
import {FamilyApi} from "../api/familyApi";
import {FamiliesStore} from "./familiesStore";
import {FamilyStore} from "./familyStore";
import {decorate, observable} from "mobx";

let clientSideRootStore: RootStore;

export class RootStore {
    userStore: UserStore;
    uiStore: UiStore;
    authStore: AuthStore;
    familiesStore: FamiliesStore;
    familyStore: FamilyStore;

    constructor() {
        let authApi = new AuthApi();
        let familyApi = new FamilyApi();
        this.userStore = new UserStore(this, authApi);
        this.authStore = new AuthStore(this, authApi);
        this.familiesStore = new FamiliesStore(this, familyApi);
        this.familyStore = new FamilyStore(this, familyApi);
        this.uiStore = new UiStore(this);

        this.authStore.init();
    }

}

decorate(RootStore, {
    userStore: observable,
    uiStore: observable,
    authStore: observable,
    familiesStore: observable,
    familyStore: observable,
});

export function getRootStore(): RootStore {
    console.log(" run get root store client");
    if (typeof window === 'undefined') {
        console.log("get root store server");
        return new RootStore();
    }
    if (clientSideRootStore == null) {
        console.log("create root store client");
        clientSideRootStore = new RootStore();

    }
    console.log("get root store client");
    return clientSideRootStore;
}
