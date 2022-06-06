import React from "react";
import { FC } from "react";
import { useState, useEffect } from "react";
import { Worker } from "../../Service/ClassWorker";
import { update } from "firebase/database";
import { getWorkersRef } from "../../Service/firebase";
import { IWorker } from "../../Service/MyInterfaces";
import "./FormEditWorker.scss";



interface FormEditWorkerProps {
    active: boolean;
    itemWorker?: Worker;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;

    setNewUser?: (
        name: string,
        lastname: string,
        patronymic: string,
        age: number | string,
        gender: string,
        position: string,
        infoPosition: string,
        department: number | string
    ) => void;
}

export const FormEditWorker: FC<FormEditWorkerProps> = ({ active, itemWorker, setActive, setNewUser }) => {

    const [messageError, setMessageError] = useState<string>("");

    const [valName, setValName] = useState<string>("");
    const [valLastname, setValLastname] = useState<string>("");
    const [valPatronymic, setValPatronymic] = useState<string>("");
    const [valAge, setValAge] = useState<number | string>("");
    const [valGender, setValGender] = useState<string>("");
    const [valPosition, setValPosition] = useState<string>("");
    const [valInfoPosition, setValInfoPosition] = useState<string>("");
    const [valDepartment, setValDepartment] = useState<string | number>("");


    useEffect(() => {
        if (itemWorker) {
            setValName(itemWorker.name);
            setValLastname(itemWorker.lastname);
            setValPatronymic(itemWorker.patronymic);
            setValAge(itemWorker.age);
            setValGender(itemWorker.gender);
            setValPosition(itemWorker.position);
            setValInfoPosition(itemWorker.infoPosition);
            setValDepartment(itemWorker.department);
        } else {
            setValName("");
            setValLastname("");
            setValPatronymic("");
            setValAge("");
            setValInfoPosition("");
            setValGender("");
            setValPosition("");
            setValDepartment("");
            setMessageError(prev => prev = "");
        }



    }, [active]);

    const changeName = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setValName(prev => prev = ev.target.value);
    }

    const changeLastname = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setValLastname(prev => prev = ev.target.value);
    }

    const changePatronymic = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setValPatronymic(prev => prev = ev.target.value);
    }

    const changeAge = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setValAge(prev => prev = ev.target.value);
    }

    const changeGender = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setValGender(prev => prev = ev.target.value);
    }

    const changePosition = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setValPosition(prev => prev = ev.target.value);
    }

    const changeInfoPosition = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setValInfoPosition(prev => prev = ev.target.value);
    }

    const changeDepartment = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setValDepartment(prev => prev = ev.target.value);
    }


    const editPersonnale = (ev: React.FormEvent) => {
        ev.preventDefault();

        if (valName === "" ||
            valLastname === "" ||
            valPatronymic === "" ||
            valAge === "" ||
            valGender === "" ||
            valPosition === "" ||
            valInfoPosition === "" ||
            valDepartment === ""
        ) {
            setMessageError(prev => prev = "Все поля дожны быть заполнены!")
            return;
        }

        if (itemWorker) {

            const changeUser: Omit<IWorker, "id"> = {
                name: valName,
                lastname: valLastname,
                patronymic: valPatronymic,
                age: valAge,
                gender: valGender,
                position: valPosition,
                infoPosition: valInfoPosition,
                department: valDepartment
            }
            update(getWorkersRef(itemWorker.id), changeUser);

        } else {

            if (setNewUser) {
                setNewUser(valName, valLastname, valPatronymic, valAge, valGender, valPosition, valInfoPosition, valDepartment);
            }
        }

        setActive(false);

    }



    return (
        <form className="edit-worker" onSubmit={editPersonnale}>
            <h4 className="edit-worker__title">Информация о сотруднике</h4>
            <div className="edit-worker__message-error">{messageError}</div>


            <p><input className="edit-worker__input" type="text" value={valName} onChange={changeName} placeholder="Имя" /></p>

            <p><input className="edit-worker__input" type="text" value={valLastname} onChange={changeLastname} placeholder="Фамилия" /></p>

            <p><input className="edit-worker__input" type="text" value={valPatronymic} onChange={changePatronymic} placeholder="Отчество" /></p>

            <p><input className="edit-worker__input" type="text" value={valAge} onChange={changeAge} placeholder="Возраст" /></p>

            <p><input className="edit-worker__input" type="text" value={valGender} onChange={changeGender} placeholder="Пол" /></p>

            <p><input className="edit-worker__input" type="text" value={valPosition} onChange={changePosition} placeholder="Должность" /></p>

            <p><input className="edit-worker__input" type="text" value={valInfoPosition} onChange={changeInfoPosition} placeholder="Информация по должности" /></p>

            <p><input className="edit-worker__input" type="text" value={valDepartment} onChange={changeDepartment} placeholder="Отдел" /></p>

            <button className="edit-worker__btn" type="submit">Применить изменения</button>
        </form>
    )
}