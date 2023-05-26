export const getDate = (dateTimeString:string) =>{
    const dateTime = new Date(dateTimeString);
    
    // Получение времени в формате "часы:минуты"
    const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Получение даты в формате "день.месяц."
    const date = dateTime.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
  
    return { time, date };
  }