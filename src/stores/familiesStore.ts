import {RootStore} from "./rootStore";
import {FamilyApi} from "../api/familyApi";
import {Family} from "../models/family";
import {action, computed, decorate, observable} from "mobx";
import {FamilyShortDto} from "../dtos/family";


class FamiliesStore {
    private rootStore: RootStore;
    private familyApi: FamilyApi;

    families: Family[] = [];

    constructor(rootStore: RootStore, familyApi: FamilyApi) {
        this.rootStore = rootStore;
        this.familyApi = familyApi;
    }

    get hasFamilies() {
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

    updateFamilies(json: FamilyShortDto[]) {
        this.families = json.map(j => Family.fromJson(j));
        // json.forEach(j => this.families.push(Family.fromJson(j)));
    }
}

decorate(FamiliesStore, {
    families: observable,
    hasFamilies: computed,
    updateFamilies: action.bound,
});

export {FamiliesStore}