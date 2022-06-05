import React from "react";
import { FC } from "react";
import "./MySelect.scss";



interface MySelectProps {
    options: string[];
    defaultValue: string;
    value: string;
    onChange: (valueFilter: string) => void;
}


export const MySelect: FC<MySelectProps> = ({ options, defaultValue, value, onChange }) => {

    return (
        <select
            className="select-item"
            value={value}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>) => onChange(ev.target.value)}
        >
            <option disabled value=''>{defaultValue}</option>
            {options.map(option => <option key={option} value={option}>{option}</option>)}

        </select>
    )
}
