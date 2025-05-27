export const dangerousCharsRegex = /[<>{}"'|;]/g;

export const sanitizeInput = (value: string) =>
    value.replace(dangerousCharsRegex, "");

export const findFirstInvalidChar = (value: string): string | null => {
    const match = value.match(dangerousCharsRegex);
    return match ? match[0] : null;
};

export const isValidInput = (value: string) => !dangerousCharsRegex.test(value);