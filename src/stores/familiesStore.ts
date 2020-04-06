import {RootStore} from "./rootStore";
import {FamilyApi} from "../api/familyApi";
import {Family} from "../models/family";
import {action, computed, observable} from "mobx";
import {FamilyShortDto} from "../dtos/family";
import {v4 as uuidv4} from 'uuid';


class FamiliesStore {
    private rootStore: RootStore;
    private familyApi: FamilyApi;

    @observable families: Family[] = [];

    constructor(rootStore: RootStore, familyApi: FamilyApi) {
        this.rootStore = rootStore;
        this.familyApi = familyApi;
    }

    @computed get hasFamilies() {
        return this.families != null && this.families.length > 0;
    }

    async fetchFamilies() {
        this.rootStore.uiStore.showLoading();

        try {
            const accessToken = await this.rootStore.authStore.getAccessToken();
            if (accessToken == null) {
                throw new Error("Unauthorized");
            }
            const json = await this.familyApi.getFamilies(accessToken);
            this.updateFamilies(json);
        } catch (err) {
            this.rootStore.uiStore.catchError(err);
        } finally {
            this.rootStore.uiStore.hideLoading()
        }
    }

    @action.bound updateFamilies(json: FamilyShortDto[]) {
        this.families = json.map(j => Family.fromJson(j));
    }

    async addNewFamily(title: string) {
        return this.saveFamily(uuidv4(), title);
    }

    async saveFamily(uuid: string, title: string) {
        this.rootStore.uiStore.showLoading();

        try {
            const accessToken = await this.rootStore.authStore.getAccessToken();
            if (accessToken == null) {
                throw new Error("Unauthorized");
            }
            await this.familyApi.saveFamily(uuid, title, accessToken);
            await this.fetchFamilies();
        } catch (err) {
            this.rootStore.uiStore.catchError(err);
        } finally {
            this.rootStore.uiStore.hideLoading()
        }
    }
}

export {FamiliesStore}