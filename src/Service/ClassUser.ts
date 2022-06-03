import { uid } from "uid";


export class User {

    private _id: string;

    constructor(
        protected _name: string,
        protected _lastname: string,
        protected _patronymic: string,
        protected _age: number | string,
        protected _gender: string
    ) {
        this._id = uid()
    }

    get id(): string {
        return this._id;
    }

    get fullName(): string {
        return `${this._lastname} ${this._name} ${this._patronymic}`;
    }

    get name(): string {
        return this._name;
    }

    get lastname(): string {
        return this._lastname;
    }

    get patronymic(): string {
        return this._patronymic;
    }

    get age(): number | string {
        return this._age;
    }

    get gender(): string {
        return this._gender;
    }

    set name(value: string) {
        this._name = value;
    }

    set lastname(value: string) {
        this._lastname = value;
    }

    set patronymic(value: string) {
        this._patronymic = value;
    }

    set age(value: number | string) {
        this._age = value;
    }

    set gender(value: string) {
        this._gender = value;
    }

    editUser(name: string, lastname: string, patronymic: string, age: number | string, gender: string): void {
        this.name = name;
        this.lastname = lastname;
        this._patronymic = patronymic;
        this.age = age;
        this.gender = gender;
    }
}


