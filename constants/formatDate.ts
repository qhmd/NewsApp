import {
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInMonths,
    differenceInYears,
    parseISO,
} from 'date-fns';

export const formatDate = (dateInput: string): string => {
    const date = parseISO(dateInput)
    const now = new Date()

    const diffInYears = differenceInYears(now, date)
    if (diffInYears > 0) {
        return `${diffInYears}y`; // y for year
    }

    const diffInMonths = differenceInMonths(now, date);
    if (diffInMonths > 0) {
        return `${diffInMonths}mo`; // mo for month
    }

    const diffInDays = differenceInDays(now, date);
    if (diffInDays > 0) {
        return `${diffInDays}d`; // d for day
    }

    const diffInHours = differenceInHours(now, date);
    if (diffInHours > 0) {
        return `${diffInHours}h`; // h for hour
    }

    const diffInMinutes = differenceInMinutes(now, date);
    if (diffInMinutes > 0) {
        return `${diffInMinutes}m`; // m for minute
    }
    return 'now'
}