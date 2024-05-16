export default function FormatDateToCalendarForm(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding leading zero for single digit months
    const day = ('0' + date.getDate()).slice(-2); // Adding leading zero for single digit days
    const hours = ('0' + date.getHours()).slice(-2); // Adding leading zero for single digit hours
    const minutes = ('0' + date.getMinutes()).slice(-2); // Adding leading zero for single digit minutes
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};