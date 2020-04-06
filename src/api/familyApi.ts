import {AppConfig} from "../appConfig";
import {assertOkResponse} from "../utils/http";
import {FamilyDto, FamilyShortDto} from "../dtos/family";
import fetch from 'isomorphic-unfetch';
import retryFetch from "fetch-retry";

const rFetch = retryFetch(fetch);

export class FamilyApi {
    private readonly serverUrl: string = AppConfig.familyServiceUrl || "";


    async saveFamily(familyUuid: string, familyTitle: string, token: string) {
        const response = await rFetch(`${this.serverUrl}/v1/family/${familyUuid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({title: familyTitle})
        });
        await assertOkResponse(response);
    }

    async getFamilies(token: string): Promise<FamilyShortDto[]> {
        const response = await rFetch(`${this.serverUrl}/v1/family`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        await assertOkResponse(response);

        const json = await response.json();

        return json.families.map((j: { title: string, uuid: string }) => ({
            title: j.title,
            uuid: j.uuid,
        }));
    }

    async getFamily(uuid: string, token: string): Promise<FamilyDto> {
        const response = await rFetch(`${this.serverUrl}/v1/family/${uuid}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        await assertOkResponse(response);

        return await response.json();
    }

    async deleteFamily(uuid: string, token: string) {
        const response = await rFetch(`${this.serverUrl}/v1/family/${uuid}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        await assertOkResponse(response);
    }
}