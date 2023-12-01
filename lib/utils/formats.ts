export const cast_date = (args: string, format_code:string) => {
    const date = new Date(args);
    let formattedDate = '';

    switch (format_code.toLowerCase()) {
        case 'us':
            formattedDate = date.toLocaleDateString('en-US');
            break;
        case 'uk':
            formattedDate = date.toLocaleDateString('en-GB');
            break;
        case 'iso':
            formattedDate = date.toISOString();
            break;
        case 'de':
            formattedDate = date.toLocaleDateString('de-DE');
            break;
        case 'time-us':
            formattedDate = date.toLocaleTimeString('en-US');
            break;
        case 'time-uk':
            formattedDate = date.toLocaleTimeString('en-GB');
            break;
        case 'time-de':
            formattedDate = date.toLocaleTimeString('de-DE');
            break;
        default:
            formattedDate = args;
            break;
    }

    return formattedDate;
}



export const date_seconds_from_now = (seconds: number) => {
    const now = new Date(); // Current date and time
    const futureDate = new Date(now.getTime() + seconds * 1000);
    return futureDate.toISOString();

}
