"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCSV = exports.saveDataCSV = void 0;
const fs = require("fs");
const path = require("path");
const csv_parse_1 = require("csv-parse");
const formDate_1 = require("./formDate");
let resultCSV = [];
function saveDataCSV(result) {
    resultCSV = result;
    return resultCSV.reverse();
}
exports.saveDataCSV = saveDataCSV;
function parseCSVDate(dateString) {
    const [day, monthStr, year] = dateString.split('-');
    const monthNames = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    const month = monthNames.indexOf(monthStr); // Obtiene el índice del mes
    return new Date(parseInt(year), month, parseInt(day));
}
function readCSV() {
    return new Promise((resolve, reject) => {
        const csvFilePath = path.resolve(__dirname, '../../files/stocks-ITX.csv');
        const headers = ['Fecha', 'Cierre', 'Apertura'];
        const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
        (0, csv_parse_1.parse)(fileContent, {
            delimiter: ';',
            columns: headers,
            trim: true,
            skip_empty_lines: true,
        }, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            const parsedResult = result.map((row) => {
                const date = parseCSVDate(row.Fecha);
                return {
                    Fecha: (0, formDate_1.formatDate)(date),
                    Cierre: parseFloat(row.Cierre),
                    Apertura: parseFloat(row.Apertura)
                };
            });
            saveDataCSV(parsedResult);
            resolve(parsedResult);
        });
    });
}
exports.readCSV = readCSV;
