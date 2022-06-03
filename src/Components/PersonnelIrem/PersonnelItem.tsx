import React from "react"
import { useState } from "react"
import { FC } from "react"
import { MyModal } from "../MyModal/MyModal"
import { PositionUser } from "../../Service/ClassPositionUser"
import { EditPersonnale } from "../EditPersonnale/EditPersonnale"

interface PersonnelProps {
    itemPersonnel: PositionUser;
    deleteUserInfo: (user: PositionUser) => void;
}

export const PersonnelItem: FC<PersonnelProps> = ({ itemPersonnel, deleteUserInfo }) => {

    const [showInfo, setShowInfo] = useState<boolean>(false)
    const [activModal, setActivModal] = useState<boolean>(false)

    const getshowInfo = (ev: React.MouseEvent<HTMLDivElement>): void => {
        setShowInfo(prev => prev = !prev)
    }



    return (
        <div className="personnel-item">
            <div className="personnel-item__content">
                <div className=""></div>
                <h3
                    className="personnel-item__user-name"
                    onClick={getshowInfo}
                >
                    {itemPersonnel.fullName}
                </h3>
                <div className="personnel-item__full-info">
                    {showInfo &&
                        <div className="personnel-item__full-info-content">
                            <ul>
                                <li>Возраст: {itemPersonnel.age} лет</li>
                                <li>Пол: {itemPersonnel.gender}</li>
                                <li>Должность: {itemPersonnel.position}</li>
                                <li>Отдел: {itemPersonnel.department}</li>
                                <li>Информация по должности: {itemPersonnel.infoPosition}</li>
                            </ul>
                            <button onClick={() => setActivModal(true)}>Редактировать</button>

                            <button onClick={() => deleteUserInfo(itemPersonnel)}>Удалить сотрудника</button>

                            <MyModal active={activModal} setActive={setActivModal}>
                                <EditPersonnale
                                    active={activModal}
                                    itemPersonnel={itemPersonnel}
                                    setActive={setActivModal}
                                />
                            </MyModal>
                        </div>
                    }


                </div>
            </div>
        </div>
    )
}