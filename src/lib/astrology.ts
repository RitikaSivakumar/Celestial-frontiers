
export function getZodiacSign(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;

    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces";
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Capricorn";
    return "Unknown";
}

export function getAstrologicalMessage(zodiac: string, name: string): string {
    switch (zodiac) {
        case "Aries":
            return `You were born under the sign of Aries, ${name} — a true pioneer with courageous spirit!`;
        case "Taurus":
            return `You were born under the sign of Taurus, ${name} — dependable and strong, with a love for comfort.`;
        case "Gemini":
            return `You were born under the sign of Gemini, ${name} — a curious and adaptable soul, always learning.`;
        case "Cancer":
            return `You were born under the sign of Cancer, ${name} — deeply intuitive and nurturing to those you love.`;
        case "Leo":
            return `You were born under the sign of Leo, ${name} — a natural leader with a heart of gold!`;
        case "Virgo":
            return `You were born under the sign of Virgo, ${name} — practical, kind, and always striving for the best.`;
        case "Libra":
            return `You were born under the sign of Libra, ${name} — a peace-loving spirit who values harmony and justice.`;
        case "Scorpio":
            return `You were born under the sign of Scorpio, ${name} — passionate, resourceful, and a true friend.`;
        case "Sagittarius":
            return `You were born under the sign of Sagittarius, ${name} — an optimistic adventurer with a great sense of humor.`;
        case "Capricorn":
            return `You were born under the sign of Capricorn, ${name} — disciplined and responsible, you can achieve anything.`;
        case "Aquarius":
            return `You were born under the sign of Aquarius, ${name} — an original thinker who marches to their own beat.`;
        case "Pisces":
            return `You were born under the sign of Pisces, ${name} — a compassionate and artistic soul with a gentle heart.`;
        default:
            return `Welcome, ${name}! We're happy to have you here.`;
    }
}
