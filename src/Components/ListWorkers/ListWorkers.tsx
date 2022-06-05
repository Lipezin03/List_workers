import React from "react";
import { FC } from "react";
import { WorkerItem } from "../WorkerItem/WorkerItem";
import { useState, useEffect, useMemo } from "react";
import { Worker } from "../../Service/ClassWorker";
import { MyModal } from "../MyModal/MyModal";
import { FilterBlock } from "../FilterBlock/FilterBlock";
import { FormEditWorker } from "../FormEditWorker/FormEditWorker";
import { onValue, set } from "firebase/database";
import { workersRef, getWorkersRef } from "../../Service/firebase";
import { uid } from "uid";
import { IWiorker } from "../../Service/MyInterfaces";
import "./ListWorkers.scss";


export const ListWorkers: FC = () => {

    const [listWorkers, setListWorkers] = useState<Worker[]>([]);
    const [activModal, setActivModal] = useState<boolean>(false);
    const [selectValuePosition, setSelectValuePosition] = useState<string>("");
    const [selectValueDepartment, setSelectValueDepartment] = useState<string>("");
    const [filterListWorkers, setFilterListWorkers] = useState<Worker[] | null>(null);

    const doubleFilter = (selPosition: string, selDepartment: string): Worker[] => {

        let result: Worker[] = listWorkers.filter(el => el.position === selPosition);
        result = result.filter(el => String(el.department) === selDepartment);

        return result;
    }


    useEffect(() => {

        onValue(workersRef, (snaphots) => {
            let listPersonnale: Worker[] = [];
            snaphots.forEach(el => {
                const user = new Worker(
                    el.val().id,
                    el.val().name,
                    el.val().lastname,
                    el.val().patronymic,
                    el.val().age,
                    el.val().gender,
                    el.val().position,
                    el.val().infoPosition,
                    el.val().department)

                listPersonnale.push(user);

            })
            setListWorkers(prev => prev = listPersonnale);
        })
    }, [])

    useEffect(() => {

        if (selectValuePosition && selectValueDepartment) {
            setFilterListWorkers([...doubleFilter(selectValuePosition, selectValueDepartment)]);
            return;
        }

        if (selectValuePosition && !selectValueDepartment) {
            setFilterListWorkers(prev => prev = listWorkers.filter(el => el.position === selectValuePosition));
        }

        if (!selectValuePosition && selectValueDepartment) {
            setFilterListWorkers(prev => prev = listWorkers.filter(el => String(el.department) === selectValueDepartment));
        }

    }, [selectValuePosition, listWorkers, selectValueDepartment]);



    const getFilterListWorkers = useMemo(() => {

        if (!filterListWorkers) {
            return listWorkers;
        } else {
            return filterListWorkers;
        }

    }, [filterListWorkers, listWorkers]);



    const setNewUser = (
        name: string,
        lastname: string,
        patronymic: string,
        age: number | string,
        gender: string,
        position: string,
        infoPosition: string,
        department: number | string
    ): void => {

        const newEser: IWiorker = {
            id: uid(),
            name: name,
            lastname: lastname,
            patronymic: patronymic,
            age: age,
            gender: gender,
            position: position,
            infoPosition: infoPosition,
            department: department
        };

        set(getWorkersRef(newEser.id), newEser);
    }



    return (
        <div className="list-workers">

            <header className="list-workers__header">
                <div className="list-workers__title-block container">
                    <h1 className="list-workers__title">Список сотрудников</h1>
                    <div className="list-workers__filters-block">
                        <FilterBlock
                            setSelectValueDepartment={setSelectValueDepartment}
                            setSelectValuePosition={setSelectValuePosition}
                            setFilterListWorkers={setFilterListWorkers}
                            selectValueDepartment={selectValueDepartment}
                            selectValuePosition={selectValuePosition}
                            listWorkers={listWorkers} />
                    </div>


                    <div className="list-workers__btn-box">
                        <button className="list-workers__btn-add" onClick={() => setActivModal(true)}>Добавить сотрудника</button>

                        <MyModal active={activModal} setActive={setActivModal}>
                            <FormEditWorker
                                active={activModal}
                                setNewUser={setNewUser}
                                setActive={setActivModal} />
                        </MyModal>
                    </div>
                </div>
            </header>
            <div className="list-workers__content container">


                <div className="list-workers__list">
                    {getFilterListWorkers?.map((user) => {
                        return (
                            <WorkerItem
                                key={user.id}
                                itemWorker={user} />
                        )
                    })}
                </div>

            </div>
            <div className="list-workers__statistics">
                <div className="list-workers__statistics-info container">Число сотрудников: {getFilterListWorkers.length}</div>
            </div>

        </div>
    )
}

