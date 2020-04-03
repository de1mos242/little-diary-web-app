import {RootStore} from "./rootStore";
import {action, computed, decorate, observable} from "mobx";

export class UiStore {
    private rootStore: RootStore;

    loadingsCount = 0;
    errorMessage = "";

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    get isLoading() {
        return this.loadingsCount == 0;
    }

    get hasErrorMessage() {
        return this.errorMessage != null && this.errorMessage.length > 0;
    }

    showLoading() {
        this.loadingsCount++;
    }

    hideLoading() {
        this.loadingsCount--;
    }

    showError(err: any) {
        this.errorMessage = err.toString();
    }

    hideError() {
        this.errorMessage = "";
    }
}

decorate(UiStore.prototype, {
    loadingsCount: observable,
    errorMessage: observable,
    isLoading: computed,
    hasErrorMessage: computed,
    showLoading: action,
    hideLoading: action,
    showError: action,
    hideError: action,

});