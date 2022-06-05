import { WorkerPositions } from "./Constants";
import { Worker } from "./ClassWorker";

export const getIndexNextWorkerPosition = (worker: Worker): number | string => {

    const result: number = WorkerPositions.reduce((acc, item, idx): number => {

        if (worker.position.toUpperCase() === item.toUpperCase()) {
            acc = idx + 1;
        }
        return acc;
    }, 0);

    if (result === WorkerPositions.length) {
        return "Это человек уже занимает высшую должность";
    } else if (result === 0) {
        return "Должности этого человека нет в списке, возможно ошибка в написании должности";
    } else {
        return result;
    }
}