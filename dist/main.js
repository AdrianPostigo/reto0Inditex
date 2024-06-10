"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formDate_1 = require("./functions/formDate");
const obtainLastThursday_1 = require("./functions/obtainLastThursday");
const readAndSaveCSV_1 = require("./functions/readAndSaveCSV");
let operationDay;
let stringDate;
let totalActions = 0;
let brokerWins = 0;
const moneyInvest = 49;
const startDate = new Date(Date.UTC(2001, 4, 23));
const lastThursdays = (0, obtainLastThursday_1.getAllLastThursdays)(2001, 2017, startDate);
(0, readAndSaveCSV_1.readCSV)()
    .then((data) => {
    lastThursdays.map((lastThursday, index) => {
        const date = (0, formDate_1.parseCSVDate)(lastThursday);
        date.setUTCDate(date.getUTCDate() + 1);
        checkCSV(date, data);
    });
    const totalSelling = totalActions * data[0].Cierre;
    console.log("El total de acciones que tienes son:", totalActions);
    console.log("El Broker a ganado:", brokerWins, "euros");
    console.log("El precio total obtenido por la venta de acciones es: ", parseFloat(totalSelling.toFixed(3)), "euros");
})
    .catch((error) => {
    console.error("Error al leer el CSV:", error);
});
const checkCSV = (date, data) => {
    for (let i = 0; i < data.length - 1; i++) {
        const dayData = data[i];
        const CSVDate = (0, formDate_1.parseCSVDate)(dayData.Fecha);
        if (CSVDate.getTime() === date.getTime()) {
            buyAction(dayData.Apertura);
            break;
        }
        else {
            if (CSVDate.getTime() > date.getTime()) {
                buyAction(dayData.Apertura);
                break;
            }
        }
    }
};
const buyAction = (openPrice) => {
    totalActions = Number((moneyInvest / openPrice).toFixed(3));
    brokerWins++;
};
