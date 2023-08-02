import { format, isWithinInterval, startOfWeek, endOfWeek } from "date-fns"; // Importez les fonctions de date-fns nécessaires
import fr from "date-fns/locale/fr";

export function DateTransform(date){
    const thisWeekStart = startOfWeek(new Date());
    const thisWeekEnd = endOfWeek(new Date());
    const isInThisWeek = isWithinInterval(date, { start: thisWeekStart, end: thisWeekEnd });

    return isInThisWeek ? format(date, "EEEE 'à' HH:mm", { locale: fr }) : format(date, "dd MMM yyyy", { locale: fr });
}