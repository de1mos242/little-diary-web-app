import {action, computed, decorate, observable} from "mobx";
import {RootStore} from "./rootStore";
import {User} from "../models/user";
import {AuthApi} from "../api/authApi";
import {getUserFromAccessToken} from "../utils/jwt";

export class UserStore {
    private rootStore: RootStore;
    private authApi: AuthApi;

    constructor(rootStore: RootStore, authApi: AuthApi) {
        this.rootStore = rootStore;
        this.authApi = authApi;
    }

    currentUser?: User;

    get isLoggedIn() {
        return this.currentUser != null;
    }

    async updateCurrentUserInfo() {
        this.rootStore.uiStore.showLoading();
        const accessToken = await this.rootStore.authStore.getAccessToken();
        if (accessToken == null) {
            this.updateCurrentUser(null);
            this.rootStore.uiStore.hideLoading();
            return
        }
        const userUuid = getUserFromAccessToken(accessToken);
        try {
            const json = await this.authApi.getUserInfo(userUuid, accessToken);
            this.updateCurrentUser(json);
        } catch (err) {
            this.rootStore.uiStore.showError(err);
        } finally {
            this.rootStore.uiStore.hideLoading()
        }
    }


    updateCurrentUser(json: { uuid: string, role: string, username: string } | null) {
        if (json != null) {
            this.currentUser = User.fromObj(json);
        } else {
            this.currentUser = undefined;
        }
    }
}

decorate(UserStore.prototype, {
    currentUser: observable,
    isLoggedIn: computed,
    updateCurrentUser: action,
});