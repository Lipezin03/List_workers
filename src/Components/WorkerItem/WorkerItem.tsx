import React from "react";
import { useState } from "react";
import { FC } from "react";
import { MyModal } from "../MyModal/MyModal";
import { Worker } from "../../Service/ClassWorker";
import { FormEditWorker } from "../FormEditWorker/FormEditWorker";
import { WorkerPositions } from "../../Service/Constants";
import { getIndexNextWorkerPosition } from "../../Service/getIndexNextWorkerPosition";
import { update, remove } from "firebase/database";
import { getWorkersRef } from "../../Service/firebase";
import './WorkerItem.scss';


interface WorkerItemProps {
    itemWorker: Worker;
}

export const WorkerItem: FC<WorkerItemProps> = ({ itemWorker }) => {

    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [activModal, setActivModal] = useState<boolean>(false);
    const [messageInfo, setMessageInfo] = useState<string>("")

    const getShowInfo = (ev: React.MouseEvent<HTMLDivElement>): void => {
        setShowInfo(prev => prev = !prev);
    }

    const goToUpWorkerPosition = (worker: Worker): void => {
        const result: any = getIndexNextWorkerPosition(worker);
        if (Number.isInteger(result)) {

            update(getWorkersRef(itemWorker.id), { position: WorkerPositions[result] });

        } else {
            setMessageInfo(prev => prev = result);
            setTimeout(() => {
                setMessageInfo(prev => prev = "");
            }, 3000)
        }

    }

    const deleteUser = (user: Worker): void => {
        remove(getWorkersRef(user.id));
    }

    return (
        <div className="worker-item">
            <div className="worker-item__content">

                <h3
                    className="worker-item__user-name"
                    onClick={getShowInfo}
                >
                    {itemWorker.fullName}
                </h3>
                <div className="worker-item__full-info">
                    {showInfo &&
                        <div className="worker-item__full-info-content">
                            <ul className="worker-item__ul">
                                <li className="worker-item__li"><span>Возраст: </span> {itemWorker.age} лет</li>
                                <li className="worker-item__li"><span>Пол: </span>{itemWorker.gender}</li>
                                <li className="worker-item__li"><span>Должность: </span>{itemWorker.position}</li>
                                <li className="worker-item__li"><span>Отдел: </span>{itemWorker.department}</li>
                                <li className="worker-item__li"><span>Информация по должности: : </span>{itemWorker.infoPosition}</li>
                            </ul>

                            <div className="worker-item__message-info">{messageInfo}</div>

                            <div className="worker-item__btns-block">
                                <button
                                    className="worker-item__btn"
                                    onClick={() => setActivModal(true)}>Редактировать</button>

                                <button
                                    className="worker-item__btn"
                                    onClick={() => deleteUser(itemWorker)}>Удалить сотрудника</button>

                                <div>
                                    <button
                                        className="worker-item__btn"
                                        onClick={() => goToUpWorkerPosition(itemWorker)}>Повысить на 1 ступень</button>
                                </div>


                                {/* <PromoteWorker
                                    itemWorker={itemWorker}
                                    listWorkers={listWorkers} /> */}

                                <MyModal active={activModal} setActive={setActivModal}>
                                    <FormEditWorker
                                        active={activModal}
                                        itemWorker={itemWorker}
                                        setActive={setActivModal} />

                                </MyModal>
                            </div>

                        </div>
                    }


                </div>
            </div>
        </div>
    )
}