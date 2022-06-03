import { User } from "./ClassUser";

export class PositionUser extends User {
    constructor(
        name: string,
        lastname: string,
        patronymic: string,
        age: number | string,
        gender: string,
        protected _position: string,
        protected _infoPosition: string,
        protected _department: number | string
    ) {
        super(name, lastname, patronymic, age, gender)
    }

    get position(): string {
        return this._position;
    }

    get infoPosition(): string {
        return this._infoPosition;
    }

    get department(): number | string {
        return this._department;
    }

    set position(value: string) {
        this._position = value;
    }

    set infoPositions(value: string) {
        this._infoPosition = value;
    }

    set department(value: number | string) {
        this._department = value;
    }

    editPositions(position: string, infoPosition: string, department: number | string) {
        this._position = position;
        this._infoPosition = infoPosition;
        this._department = department;
    }
}