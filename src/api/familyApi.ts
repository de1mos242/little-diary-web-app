import {AppConfig} from "../appConfig";
import {assertOkResponse} from "../utils/http";
import {Family} from "../models/family";
import {FamilyDto, FamilyShortDto} from "../dtos/family";


export class FamilyApi {
    private readonly serverUrl: string = AppConfig.familyServiceUrl || "";

    async saveFamily(family: Family, token: string) {
        const response = await fetch(`${this.serverUrl}/v1/family/${family.uuid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({title: family.title})
        });
        await assertOkResponse(response);
    }

    async getFamilies(token: string): Promise<FamilyShortDto[]> {
        const response = await fetch(`${this.serverUrl}/v1/family`, {
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
        const response = await fetch(`${this.serverUrl}/v1/family/${uuid}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        await assertOkResponse(response);

        return await response.json();
    }
}