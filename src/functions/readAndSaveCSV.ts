import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import { formatDate } from "./formDate";

type InditexActions = {
    Fecha: string;
    Cierre: number;
    Apertura: number;
}

let resultCSV: InditexActions[] = [];

export function saveDataCSV(result: InditexActions[]): InditexActions[] {
  resultCSV = result;
  return resultCSV.reverse();
}

function parseCSVDate(dateString: string): Date {
    const [day, monthStr, year] = dateString.split('-');
    const monthNames = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    const month = monthNames.indexOf(monthStr); // Obtiene el índice del mes
    return new Date(parseInt(year), month, parseInt(day));
}

export function readCSV(): Promise<InditexActions[]> {
  return new Promise((resolve, reject) => {
    const csvFilePath = path.resolve(__dirname, '../../files/stocks-ITX.csv');
    const headers = ['Fecha', 'Cierre', 'Apertura'];
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    parse(fileContent, {
      delimiter: ';',
      columns: headers,
      trim: true,
      skip_empty_lines: true,
    }, (error, result: any[]) => {
      if (error) {
        reject(error);
        return;
      }

      const parsedResult: InditexActions[] = result.map((row: any) => {
        const date = parseCSVDate(row.Fecha);
        return {
          Fecha: formatDate(date),
          Cierre: parseFloat(row.Cierre),
          Apertura: parseFloat(row.Apertura)
        };
      });

      saveDataCSV(parsedResult);
      resolve(parsedResult);
    });
  });
}

export type {InditexActions};
