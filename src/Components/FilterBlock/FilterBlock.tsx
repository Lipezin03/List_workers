import React from "react";
import { FC, useMemo } from "react";
import { MySelect } from "../MySelect/MySelect";
import { Worker } from "../../Service/ClassWorker";
import "./FilterBlock.scss";

interface FilterBlockProps {
    listWorkers: Worker[];
    selectValuePosition: string;
    selectValueDepartment: string;
    setSelectValuePosition: React.Dispatch<React.SetStateAction<string>>;
    setSelectValueDepartment: React.Dispatch<React.SetStateAction<string>>;
    setFilterListWorkers: React.Dispatch<React.SetStateAction<Worker[] | null>>;
}

export const FilterBlock: FC<FilterBlockProps> = ({ listWorkers, selectValuePosition, selectValueDepartment, setSelectValueDepartment, setSelectValuePosition, setFilterListWorkers }) => {

    const getArrPosition = useMemo(() => {
        const result: string[] = [];
        let setPosition = new Set([...listWorkers.map(el => el.position)]);

        setPosition.forEach(el => result.push(el));

        return result;

    }, [listWorkers]);

    const getArrDepartment = useMemo(() => {
        const result: string[] = [];

        let setDepartmemt = new Set([...listWorkers.map(el => String(el.department))]);

        setDepartmemt.forEach(el => result.push(el));

        return result;
    }, [listWorkers]);


    const handlerChangeSelectDepartment = ((valueFilter: string) => {
        setSelectValueDepartment(prev => prev = valueFilter);
    })

    const handlerChangeSelectPosition = ((valueFilter: string) => {
        setSelectValuePosition(prev => prev = valueFilter);
    })

    const updateList = () => {
        // window.location.reload();
        setFilterListWorkers(null);
        setSelectValueDepartment("")
        setSelectValuePosition("")
    }

    return (
        <div className="filter-block">

            <div className="filter-block__button-block">
                <button
                    className="filter-block__btn-no-filter"
                    onClick={updateList}>Сбросить фильтр</button>
            </div>

            <div className="filter-block__select-block">
                <MySelect
                    options={getArrPosition}
                    defaultValue="По должности"
                    value={selectValuePosition}
                    onChange={handlerChangeSelectPosition}
                />

                <MySelect
                    options={getArrDepartment}
                    defaultValue="По отделу"
                    value={selectValueDepartment}
                    onChange={handlerChangeSelectDepartment}
                />
            </div>
        </div>
    )
}