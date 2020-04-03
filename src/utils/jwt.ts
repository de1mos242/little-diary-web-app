import jwt_decode from 'jwt-decode';

export const getUserFromAccessToken = (accessToken: string): string => {
    const t: { user_claims: { uuid: string } } = jwt_decode(accessToken);
    return t.user_claims.uuid;
};

export const getTokenExpiration = (token: string) => {
    const t: { exp: number } = jwt_decode(token);
    return t.exp;
};