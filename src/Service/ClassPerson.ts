export class Person {

    constructor(
        private _id: string | number,
        private _name: string,
        private _lastname: string,
        private _patronymic: string,
        private _age: number | string,
        private _gender: string
    ) { }

    public get id(): string | number {
        return this._id;
    }

    public get fullName(): string {
        return `${this._lastname} ${this._name} ${this._patronymic}`;
    }

    public get name(): string {
        return this._name;
    }

    public get lastname(): string {
        return this._lastname;
    }

    public get patronymic(): string {
        return this._patronymic;
    }

    public get age(): number | string {
        return this._age;
    }

    public get gender(): string {
        return this._gender;
    }

}


