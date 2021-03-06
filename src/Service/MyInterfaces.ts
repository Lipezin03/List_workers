export interface IWorker {
    readonly id: string | number;
    readonly name: string;
    readonly lastname: string;
    readonly patronymic: string;
    readonly age: number | string;
    readonly gender: string;
    readonly position: string;
    readonly infoPosition: string;
    readonly department: number | string;
}

