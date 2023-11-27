export function getFormattedDate() {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString();
    return +new Date() +`_${day}_${month}_${year}`;
}

export const formatDate = (inputDate:string, local : string = "id-ID") => {

const options = { year: 'numeric', month: 'long', day: 'numeric' };

const date = new Date(inputDate);
return date.toLocaleDateString('id-ID', options as Intl.DateTimeFormatOptions);
}
