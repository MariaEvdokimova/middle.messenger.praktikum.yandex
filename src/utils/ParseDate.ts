export const parseDate = (dateToParse: string) => {
    if (!dateToParse) return {time: '', date: ''};
  
    const date = new Date(dateToParse);
  
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

    return {
        time: `${hours}:${minutes}`, 
        date: `${date.getDate()}-${month}-${date.getFullYear()}`
    };
  }
