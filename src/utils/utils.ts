import { UserProps } from "./types";

export const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/;

export const firstLetterUppercase = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// format de la date en jjj. DD mmm. YYYY
// exemple : lun. 01 janv. 2023
export const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    };
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('fr-FR', options);
};

// formate de l'heure en HH:mm
// exemple : 12:00
export const formatTime = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
    };
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString('fr-FR', options);
};

export const formatDateTime = (date: string) => {
    const dateFormatted = formatDate(date);
    const timeFormatted = formatTime(date);
    return `${dateFormatted} à ${timeFormatted}`;
};

export const initials = (user: UserProps) => {return `${user.firstname?.[0] ?? ''}${user.lastname?.[0] ?? ''}`.toUpperCase()};
