export class Baby {
    firstName: string;
    dateOfBirth: Date;
    uuid: string;


    constructor(firstName: string, dateOfBirth: Date, uuid: string) {
        this.firstName = firstName;
        this.dateOfBirth = dateOfBirth;
        this.uuid = uuid;
    }
}