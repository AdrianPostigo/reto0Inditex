export function formatDate(date: Date): string {
    const day = ("0" + date.getDate()).slice(-2); // Formato de dos dígitos para el día
    const monthNames = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

export function parseCSVDate(dateString: string): Date {
    const [day, monthStr, year] = dateString.split('-');

    const monthMap: { [key: string]: number } = {
        'ene': 0, 'feb': 1, 'mar': 2, 'abr': 3, 'may': 4, 'jun': 5,
        'jul': 6, 'ago': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dic': 11
    };

    const month = monthMap[monthStr.toLowerCase()];

    if (month === undefined) {
        throw new Error(`Mes no reconocido: ${monthStr}`);
    }

    return new Date(Date.UTC(parseInt(year), month, parseInt(day)));
}
