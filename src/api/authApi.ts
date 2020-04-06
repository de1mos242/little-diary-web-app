import {AppConfig} from "../appConfig";
import {assertOkResponse} from "../utils/http";
import {UserPublicDto} from "../dtos/user";
import fetch from 'isomorphic-unfetch';
import retryFetch from "fetch-retry";

const rFetch = retryFetch(fetch);

export class AuthApi {
    private readonly serverUrl: string = AppConfig.authServiceUrl || "";

    async login(username: string, password: string) {
        const response = await rFetch(`${this.serverUrl}/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        });
        await assertOkResponse(response);
        const json = await response.json();

        return {
            accessToken: json.access_token,
            refreshToken: json.refresh_token
        }
    }

    async refreshAccessToken(refreshToken: string): Promise<string> {
        const response = await rFetch(`${this.serverUrl}/auth/refresh`, {
            method: 'POST',
            headers: {'Authorization': `Bearer ${refreshToken}`}
        });
        await assertOkResponse(response);
        const json = await response.json();

        return json.access_token
    }

    async getUserInfo(userUuid: string, token: string): Promise<{ username: string, role: string, uuid: string }> {
        const response = await rFetch(`${this.serverUrl}/api/v1/users/${userUuid}`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
        await assertOkResponse(response);
        const {user} = await response.json();
        return {
            username: user.username,
            role: user.role,
            uuid: user.uuid
        }
    }

    async getPublicUsers(userUuids: string[], token: string): Promise<UserPublicDto[]> {
        const url = new URL(`${this.serverUrl}/api/v1/users/public`);
        userUuids.forEach(uuid => url.searchParams.append("uuids", uuid));
        const response = await rFetch(url.toString(), {
            headers: {'Authorization': `Bearer ${token}`}
        });
        await assertOkResponse(response);
        return await response.json();
    }
}