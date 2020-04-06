import {RootStore} from "./rootStore";
import {action, computed, decorate, observable} from "mobx";
import Router from "next/router";

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

    catchError(err: Error) {
        if (typeof window !== 'undefined') {
            if (err.message == "Unauthorized") {
                Router.push("/login");
                return
            }
        }
        this.errorMessage = err.toString();
    }

    hideError() {
        this.errorMessage = "";
    }
}

decorate(UiStore, {
    loadingsCount: observable,
    errorMessage: observable,
    isLoading: computed,
    hasErrorMessage: computed,
    showLoading: action.bound,
    hideLoading: action.bound,
    catchError: action.bound,
    hideError: action.bound,

});