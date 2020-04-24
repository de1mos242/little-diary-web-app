import {UserStore} from "./userStore";
import {UiStore} from "./uiStore";
import {AuthApi} from "../api/authApi";
import {AuthStore} from "./authStore";
import {FamilyApi} from "../api/familyApi";
import {FamiliesStore} from "./familiesStore";
import {FamilyStore} from "./familyStore";
import {decorate, observable} from "mobx";
import {AppConfig} from "../appConfig";

let clientSideRootStore: RootStore;

export class RootStore {
    userStore: UserStore;
    uiStore: UiStore;
    authStore: AuthStore;
    familiesStore: FamiliesStore;
    familyStore: FamilyStore;
    fullyInitialized = false;

    constructor(appConfig: AppConfig) {
        if (appConfig.isInitialized) {
            this.fullyInitialized = true;
        }
        let authApi = new AuthApi(appConfig.getAuthServiceUrl());
        let familyApi = new FamilyApi(appConfig.getFamilyServiceUrl());
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

export function getRootStore(appConfig: AppConfig): RootStore {
    if (typeof window === 'undefined') {
        return new RootStore(appConfig);
    }
    if (clientSideRootStore == null || !clientSideRootStore.fullyInitialized) {
        clientSideRootStore = new RootStore(appConfig);
    }
    return clientSideRootStore;
}
