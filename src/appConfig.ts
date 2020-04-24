require('dotenv').config()

type SerializedConfig = { authServiceUrl: string, familyServiceUrl: string, measurementServiceUrl: string };

export class AppConfig {
    authServiceUrl = process.env.AUTH_SERVICE_URL;
    familyServiceUrl = process.env.FAMILY_SERVICE_URL;
    measurementServiceUrl = process.env.MEASUREMENT_SERVICE_URL;


    get isInitialized() {
        return !(!this.authServiceUrl && !this.familyServiceUrl && !this.measurementServiceUrl);
    }

    getAuthServiceUrl() {
        return this.authServiceUrl || "";
    }

    getFamilyServiceUrl() {
        return this.familyServiceUrl || "";
    }

    getMeasurementServiceUrl() {
        return this.measurementServiceUrl || "";
    }

    convertToObj(): SerializedConfig {
        return {
            authServiceUrl: this.getAuthServiceUrl(),
            familyServiceUrl: this.getFamilyServiceUrl(),
            measurementServiceUrl: this.getMeasurementServiceUrl()
        }
    }

    static convertFromObject(obj: SerializedConfig) {
        let appConfig = new AppConfig();
        appConfig.authServiceUrl = obj.authServiceUrl;
        appConfig.familyServiceUrl = obj.familyServiceUrl;
        appConfig.measurementServiceUrl = obj.measurementServiceUrl;
        return appConfig;
    }
}