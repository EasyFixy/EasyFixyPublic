export const convertToColombiaTime = (isoString: string): string => {
    // Crear un objeto Date a partir de la cadena ISO
    const date = new Date(isoString);
  
    // Opciones para formatear la fecha en la zona horaria de Colombia
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Bogota',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
  
    // Formatear la fecha en la zona horaria de Colombia
    const formatter = new Intl.DateTimeFormat('es-CO', options);
    return formatter.format(date);
  };