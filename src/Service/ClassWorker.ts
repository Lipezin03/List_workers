import { Person } from "./ClassPerson";

export class Worker extends Person {
    constructor(
        id: string | number,
        name: string,
        lastname: string,
        patronymic: string,
        age: number | string,
        gender: string,
        private _position: string,
        private _infoPosition: string,
        private _department: number | string
    ) {
        super(id, name, lastname, patronymic, age, gender)
    }

    public get position(): string {
        return this._position;
    }

    public get infoPosition(): string {
        return this._infoPosition;
    }

    public get department(): number | string {
        return this._department;
    }

}