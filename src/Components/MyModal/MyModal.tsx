import React from "react";
import { FC } from "react";
import "./MyModal.scss"

interface ModalProps {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
}

export const MyModal: FC<ModalProps> = ({ active, setActive, children }) => {

    return (

        <div
            className={active ? "modal active" : "modal"}
            onClick={() => setActive(false)}
        >
            <div
                className="modal__content"
                onClick={(ev: React.MouseEvent<HTMLDivElement>) => ev.stopPropagation()}
            >
                {children}
            </div>
        </div >
    )
}