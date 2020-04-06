import {RootStore} from "./rootStore";
import {FamilyApi} from "../api/familyApi";
import {Family} from "../models/family";
import {action, observable} from "mobx";
import {FamilyDto} from "../dtos/family";
import {User} from "../models/user";

export class FamilyStore {
    private rootStore: RootStore;
    private familyApi: FamilyApi;

    @observable
    family: Family | null = null;

    constructor(rootStore: RootStore, familyApi: FamilyApi) {
        this.rootStore = rootStore;
        this.familyApi = familyApi;
        // this.family = new Family("none", "none");
    }

    @action
    updateFamily(json: FamilyDto, users: User[]) {
        this.family = Family.fromJson(json);
        console.log(`update nested family with ${JSON.stringify(json)} and ${JSON.stringify(users)}`);
        this.family.updateNested(json, users);
    }

    @action
    async fetchFamilyInfo(uuid: string) {
        this.rootStore.uiStore.showLoading();
        this.family = null;

        try {
            const accessToken = await this.rootStore.authStore.getAccessToken();
            if (accessToken == null) {
                throw new Error("Unauthorized");
            }
            const json = await this.familyApi.getFamily(uuid, accessToken);
            const users = await this.rootStore.userStore.fetchPublicUsers(json.members.map(m => m.user_uuid));
            this.updateFamily(json, users);
        } catch (err) {
            this.rootStore.uiStore.catchError(err);
        } finally {
            this.rootStore.uiStore.hideLoading()
        }
    }

    async saveFamily(newFamilyTitle: string) {
        if (this.family == null) {
            return
        }
        this.rootStore.uiStore.showLoading();

        try {
            const accessToken = await this.rootStore.authStore.getAccessToken();
            if (accessToken == null) {
                throw new Error("Unauthorized");
            }
            await this.familyApi.saveFamily(this.family.uuid, newFamilyTitle, accessToken);
            await this.fetchFamilyInfo(this.family.uuid);
        } catch (err) {
            this.rootStore.uiStore.catchError(err);
        } finally {
            this.rootStore.uiStore.hideLoading()
        }
    }

    async deleteFamily() {
        if (this.family == null) {
            return
        }

        this.rootStore.uiStore.showLoading();

        try {
            const accessToken = await this.rootStore.authStore.getAccessToken();
            if (accessToken == null) {
                throw new Error("Unauthorized");
            }
            await this.familyApi.deleteFamily(this.family.uuid, accessToken);
        } catch (err) {
            this.rootStore.uiStore.catchError(err);
        } finally {
            this.rootStore.uiStore.hideLoading()
        }
    }
}