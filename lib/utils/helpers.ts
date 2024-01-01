export function extractContent(inputString: string, substring: string): string | null {
    const titleSubstring = `${substring}:`;
    const startIndex = inputString.indexOf(titleSubstring);
    if (startIndex === -1) {
        return null; // Substring not found
    }

    const startQuoteIndex = inputString.indexOf('"', startIndex + titleSubstring.length);
    if (startQuoteIndex === -1) {
        return null; // Opening quote not found
    }

    const endQuoteIndex = inputString.indexOf('"', startQuoteIndex + 1);
    if (endQuoteIndex === -1) {
        return null; // Closing quote not found
    }

    const content = inputString.substring(startQuoteIndex + 1, endQuoteIndex);
    return content;
}
export function isNotNumeric(value) {
    return isNaN(value);
}
