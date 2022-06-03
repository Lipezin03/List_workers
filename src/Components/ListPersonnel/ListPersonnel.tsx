import React from "react"
import { FC } from "react"
import { PersonnelItem } from "../PersonnelIrem/PersonnelItem"
import { useState, useEffect, useMemo } from "react"
import { database, Database } from "../../Service/Database"
import { PositionUser } from "../../Service/ClassPositionUser"
import { MyModal } from "../MyModal/MyModal"
import { EditPersonnale } from "../EditPersonnale/EditPersonnale"
import { MySelect } from "../MySelect/MySelect"


export const ListPersonnel: FC = () => {

    const [listPersonel, setListPersonel] = useState<Database>(database);
    const [activModal, setActivModal] = useState<boolean>(false);
    const [selectValuePosition, setSelectValuePosition] = useState<string>("");
    const [selectValueDepartment, setSelectValueDepartment] = useState<string>("");
    const [filterListPersonnel, setFilterListPersonnel] = useState<Database | null>(null);

    const filter = (selPosition: string, selDepartment: string): PositionUser[] => {

        let result: PositionUser[] = listPersonel.filter(el => el.position === selPosition);
        result = result.filter(el => String(el.department) === selDepartment);

        return result;

    }

    useEffect(() => {

        if (selectValuePosition && selectValueDepartment) {
            setFilterListPersonnel([...filter(selectValuePosition, selectValueDepartment)]);
            return;
        }

        if (selectValuePosition && !selectValueDepartment) {
            setFilterListPersonnel(prev => prev = listPersonel.filter(el => el.position === selectValuePosition));
        }

        if (!selectValuePosition && selectValueDepartment) {
            setFilterListPersonnel(prev => prev = listPersonel.filter(el => String(el.department) === selectValueDepartment));
        }

    }, [selectValuePosition, listPersonel, selectValueDepartment]);



    const getFilterListPersonnale = useMemo(() => {

        if (!filterListPersonnel) {
            return listPersonel;
        } else {
            return filterListPersonnel;
        }

    }, [filterListPersonnel, listPersonel]);



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

        const newUser = new PositionUser(name, lastname, patronymic, age, gender, position, infoPosition, department);

        setListPersonel(prev => [...prev, newUser]);

    }


    const getArrrPosition = useMemo(() => {
        const result: string[] = [];
        let setPosition = new Set([...listPersonel.map(el => el.position)]);

        setPosition.forEach(el => result.push(el));

        return result;

    }, [listPersonel]);

    const getArrrDepartment = useMemo(() => {
        const result: string[] = [];

        let setDepartmemt = new Set([...listPersonel.map(el => String(el.department))]);

        setDepartmemt.forEach(el => result.push(el));

        return result;
    }, [listPersonel]);


    const handlerChangeSelectDepartment = ((valueFilter: string) => {
        setSelectValueDepartment(prev => prev = valueFilter);
    })

    const handlerChangeSelectPosition = ((valueFilter: string) => {
        setSelectValuePosition(prev => prev = valueFilter);
    })

    const deleteUser = (user: PositionUser): void => {
        setListPersonel(prev => prev = prev.filter(item => item.id !== user.id));
    }

    const updateList = () => {
        // window.location.reload();
        setFilterListPersonnel(null)
        setSelectValueDepartment("")
        setSelectValuePosition("")
    }

    return (
        <div className="list-personnel">
            <div className="list-personnel__content">
                <div className="list-personnel__title-block">
                    <h1>Список сотрудников предприятия</h1>

                    <button onClick={() => setActivModal(true)}>Добавить нового сотрудника</button>

                    <MySelect
                        options={getArrrPosition}
                        defaultValue="По должности"
                        value={selectValuePosition}
                        onChange={handlerChangeSelectPosition}
                    />

                    <MySelect
                        options={getArrrDepartment}
                        defaultValue="По отделу"
                        value={selectValueDepartment}
                        onChange={handlerChangeSelectDepartment}
                    />

                    <button onClick={updateList}>Убрать фильтер</button>


                    <MyModal active={activModal} setActive={setActivModal}>
                        <EditPersonnale
                            active={activModal}
                            setNewUser={setNewUser}
                            setActive={setActivModal} />
                    </MyModal>
                </div>


                <div className="list-personnel__list">
                    {getFilterListPersonnale?.map((user) => {
                        return (
                            <PersonnelItem
                                key={user.id}
                                deleteUserInfo={deleteUser}
                                itemPersonnel={user} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

