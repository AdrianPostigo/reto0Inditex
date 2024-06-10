import { formatDate, parseCSVDate } from './functions/formDate';
import { getAllLastThursdays } from './functions/obtainLastThursday';
import { readCSV } from './functions/readAndSaveCSV';
import { InditexActions } from './functions/readAndSaveCSV';

let operationDay: Date;
let stringDate: string;
let totalActions: number = 0;
let brokerWins: number = 0;
const moneyInvest: number = 49;

const startDate = new Date(Date.UTC(2001, 4, 23));
const lastThursdays = getAllLastThursdays(2001, 2017, startDate);

readCSV()
  .then((data) => {
  
    lastThursdays.map((lastThursday:string,index:number)=>{
      const date = parseCSVDate(lastThursday);
      date.setUTCDate(date.getUTCDate() + 1);
      checkCSV(date, data);
    })
    const totalSelling = totalActions*data[0].Cierre
    console.log("El total de acciones que tienes son:", totalActions)
    console.log("El Broker a ganado:", brokerWins, "euros")
    console.log("El precio total obtenido por la venta de acciones es: ",parseFloat(totalSelling.toFixed(3)), "euros")
  })
  .catch((error) => {
    console.error("Error al leer el CSV:", error);
  });

  const checkCSV = (date: Date, data: InditexActions[]) => {
    for (let i = 0; i < data.length - 1; i++) {
      const dayData = data[i];
      const CSVDate = parseCSVDate(dayData.Fecha);
  
      if (CSVDate.getTime() === date.getTime()) {
        buyAction(dayData.Apertura);
        break; 
      } else {
        if (CSVDate.getTime() > date.getTime()){
          buyAction(dayData.Apertura);
          break; 
        }
      }
    }
  }

const buyAction = (openPrice: number) => {
  totalActions = Number((moneyInvest / openPrice).toFixed(3));
  brokerWins++;
}

