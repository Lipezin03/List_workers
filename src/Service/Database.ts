import { PositionUser } from "./ClassPositionUser"

export type Database = PositionUser[]


const user1 = new PositionUser("Алексей", "Иванов", "Юрьевич", 35, "муж", "Директор", "Заместитель: Елена Фадеева", 3)
const user2 = new PositionUser("Игорь", "Синицин", "Петрович", 22, "муж", "Контролер", "3 разряд", 3)
const user3 = new PositionUser("Алена", "Фадеева", "Александровна", 41, "жен", "Руководетель подразделения", "Руководитель подразделения №3", 3)
const user4 = new PositionUser("Ирина", "Коваленко", "Васильевна", 21, "жен", "Рабочий", "Руководитель: Алексей Иванов", 3)


const user5 = new PositionUser("Антон", "Васильев", "Валерьевич", 45, "муж", "Директор", "Заместитель: Вадим Марков", 2)
const user6 = new PositionUser("Юлия", "Кобякова", "Генадьевна", 27, "муж", "Контролер", "1 разряд", 2)
const user7 = new PositionUser("Вадим", "Марков", "Анатольевич", 33, "муж", "Руководетель подразделения", "Руководитель подразделения №2", 2)
const user8 = new PositionUser("Василий", "Уткин", "Алексеевич", 55, "муж", "Рабочий", "Руководитель: Антон Васильев", 2)


export const database: Database = []
database.push(user1)
database.push(user2)
database.push(user3)
database.push(user4)
database.push(user5)
database.push(user6)
database.push(user7)
database.push(user8)


