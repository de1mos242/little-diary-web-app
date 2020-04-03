import {UserStore} from "./userStore";
import {UiStore} from "./uiStore";
import {AuthApi} from "../api/authApi";
import {AuthStore} from "./authStore";

export class RootStore {
    userStore: UserStore;
    uiStore: UiStore;
    authStore: AuthStore;

    constructor() {
        let authApi = new AuthApi();
        this.userStore = new UserStore(this, authApi);
        this.authStore = new AuthStore(this, authApi);
        this.uiStore = new UiStore(this);

        this.authStore.init();
    }

}