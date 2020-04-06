import {RootStore} from "./rootStore";
import {AuthApi} from "../api/authApi";
import {getTokenExpiration} from "../utils/jwt";
import {action, decorate, observable} from "mobx";
import Router from "next/router";

export class AuthStore {
    private rootStore: RootStore;
    private authApi: AuthApi;

    accessToken?: string;
    refreshToken?: string;

    constructor(rootStore: RootStore, authApi: AuthApi) {
        this.rootStore = rootStore;
        this.authApi = authApi;
    }

    init() {
        this.readTokensFromLocalStorage();
    }

    async login(username: string, password: string) {
        this.rootStore.uiStore.showLoading();
        try {
            const json = await this.authApi.login(username, password);
            const {accessToken, refreshToken} = json;
            this.updateTokens(accessToken, refreshToken);
            this.putTokensToLocalStorage();
            await this.rootStore.userStore.updateCurrentUserInfo();
        } catch (err) {
            this.rootStore.uiStore.catchError(err)
        } finally {
            this.rootStore.uiStore.hideLoading()
        }
    }

    logout() {
        this.removeTokens();
        AuthStore.deleteTokensFromLocalStorage();
        (async () => {
            await this.rootStore.userStore.updateCurrentUserInfo();
            await Router.push("/");
        })();
    }

    private static deleteTokensFromLocalStorage() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        }
    }

    removeTokens() {
        this.accessToken = undefined;
        this.refreshToken = undefined;
    }

    async getAccessToken() {
        const one_minute_plus = new Date();
        one_minute_plus.setTime(one_minute_plus.getTime() + (60 * 1000)); //
        // check token valid for at least one minute more
        let min_expiration_time = one_minute_plus.getTime() / 1000;
        if (this.accessToken != null) {
            let accessTokenExpiration = getTokenExpiration(this.accessToken || "");
            if (accessTokenExpiration > min_expiration_time) {
                return this.accessToken;
            }
        }

        if (this.refreshToken != null && getTokenExpiration(this.refreshToken) > min_expiration_time) {
            await this.refreshAccessToken(this.refreshToken);
            return this.accessToken;
        }

        return null;
    }

    updateTokens(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    private readTokensFromLocalStorage() {
        if (typeof window !== 'undefined') {
            let accessToken = localStorage.getItem("access_token");
            let refreshToken = localStorage.getItem("refresh_token");
            if (accessToken != null && refreshToken != null) {
                this.updateTokens(accessToken, refreshToken);
                (async () => {
                    await this.rootStore.userStore.updateCurrentUserInfo()
                })();
            }
        }
    }

    private putTokensToLocalStorage() {
        if (typeof window !== 'undefined') {
            if (this.accessToken != null && this.refreshToken != null) {
                localStorage.setItem("access_token", this.accessToken);
                localStorage.setItem("refresh_token", this.refreshToken);
            }
        }
    }

    private async refreshAccessToken(refreshToken: string) {
        this.rootStore.uiStore.showLoading();
        try {
            const accessToken = await this.authApi.refreshAccessToken(refreshToken);
            this.updateTokens(accessToken, refreshToken);
            this.putTokensToLocalStorage();
        } finally {
            this.rootStore.uiStore.hideLoading();
        }
    }
}

decorate(AuthStore, {
    accessToken: observable,
    refreshToken: observable,
    updateTokens: action.bound,
});