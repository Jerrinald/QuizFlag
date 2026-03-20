import isoCountryFr from '../data/isoCountryFr.json';

function normalizeString(input) {
    return input
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w]/g, '')
        .toLowerCase();
}

export function checkCountry(iso, countryResponse) {
    const lowerIso = iso.toLowerCase();
    const correctName = isoCountryFr[lowerIso] ?? 'Unknown';
    const isCorrect =
        lowerIso in isoCountryFr &&
        normalizeString(correctName) === normalizeString(countryResponse);
    return { isCorrect, correctName };
}
