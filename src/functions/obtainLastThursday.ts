import { formatDate } from "./formDate";

function getLastThursdayOfMonth(year: number, month: number): Date {
    // Obtener el último día del mes
    let lastDay = new Date(year, month + 1, 0); // 0 significa el último día del mes anterior

    // Retroceder hasta encontrar el último jueves
    while (lastDay.getDay() !== 4) { // 4 representa el jueves
        lastDay.setDate(lastDay.getDate() - 1);
    }

    return lastDay;
}

function isAfterOrSame(date1: Date, date2: Date): boolean {
    return date1.getTime() >= date2.getTime();
}

export function getAllLastThursdays(startYear: number, endYear: number, startDate: Date): string[] {
    const lastThursdays: string[] = [];

    for (let year = startYear; year <= endYear; year++) {
        for (let month = 0; month < 12; month++) {
            const lastThursday = getLastThursdayOfMonth(year, month);
            if (isAfterOrSame(lastThursday, startDate)) {
                lastThursdays.push(formatDate(lastThursday));
            }
        }
    }

    return lastThursdays;
}
