export function GetTime(e: Date): string {
    const minute = e.getMinutes();
    const hour = e.getHours();

    // lets convert hours to fancy times
    // 00 = 12am
    // 23 max for 11pm

    const fancyHour = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

    let amOrPm = 'AM';
    if (hour > 11) {
        amOrPm = 'PM'
    }

    const fhour = fancyHour[hour];

    return `${fhour}:${minute} ${amOrPm}`
}

export function GetDay(e: Date): string {
    // Get the day of the week as a number (0-6)
    const dayNumber = e.getDay();

    // Map day numbers to names
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Get the name of the day
    const dayName = daysOfWeek[dayNumber];

    return dayName

}

export function GetMonth(e: Date): string {
    let mNumber = e.getMonth();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let monthName = months[mNumber];

    return monthName;
}

export function fancyDay(day: string) {
    const splitIt = day.split('')
    const numIt = Number(splitIt[-1])
    if (numIt == 1) {
        return `${day}st`
    }
    if (numIt == 2) {
        return `${day}nd`
    }
    if (numIt == 3) {
        return `${day}rd`
    }
    return `${day}th`
}