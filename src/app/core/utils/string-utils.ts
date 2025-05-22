export class StringUtils {
    /**
     * Extracts initials from a name
     * For names like "Rick Marcus F. Bombita", returns "RB"
     */
    static getInitials(name: string): string {
        if (!name) return '';

        const nameParts = name.split(' ');

        // If single word, return first two letters
        if (nameParts.length === 1) {
            return nameParts[0].substring(0, 2).toUpperCase();
        }

        // Get first letter of first name
        const firstInitial = nameParts[0][0];

        // Get first letter of last name
        const lastInitial = nameParts[nameParts.length - 1][0];

        return (firstInitial + lastInitial).toUpperCase();
    }
}