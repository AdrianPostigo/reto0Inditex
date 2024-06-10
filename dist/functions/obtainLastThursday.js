"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllLastThursdays = void 0;
const formDate_1 = require("./formDate");
function getLastThursdayOfMonth(year, month) {
    // Obtener el último día del mes
    let lastDay = new Date(year, month + 1, 0); // 0 significa el último día del mes anterior
    // Retroceder hasta encontrar el último jueves
    while (lastDay.getDay() !== 4) { // 4 representa el jueves
        lastDay.setDate(lastDay.getDate() - 1);
    }
    return lastDay;
}
function isAfterOrSame(date1, date2) {
    return date1.getTime() >= date2.getTime();
}
function getAllLastThursdays(startYear, endYear, startDate) {
    const lastThursdays = [];
    for (let year = startYear; year <= endYear; year++) {
        for (let month = 0; month < 12; month++) {
            const lastThursday = getLastThursdayOfMonth(year, month);
            if (isAfterOrSame(lastThursday, startDate)) {
                lastThursdays.push((0, formDate_1.formatDate)(lastThursday));
            }
        }
    }
    return lastThursdays;
}
exports.getAllLastThursdays = getAllLastThursdays;
