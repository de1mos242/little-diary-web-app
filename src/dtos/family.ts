export type FamilyShortDto = { title: string, uuid: string }

export type FamilyDto = { title: string, uuid: string, babies: BabyDto[], members: MemberDto[] }

export type BabyDto = { first_name: string, uuid: string, date_of_birth: string };

export type MemberDto = { uuid: string, user_uuid: string };