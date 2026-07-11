'use strict'

/**
 * Returns an HTML string for a badge
 * @param token block
 * @return HTML string for the badge
 */

interface BadgeToken {
    color: string;
    value: string;
}

export class BadgeHTML {

	private token: BadgeToken;

	constructor(token: BadgeToken) {
		this.token = token;
	}

	render(): string {

		// Create a span element for the badge
		const baseClasses = "text-sm font-semibold mr-2 px-2.5 py-0.5 rounded";
		
		// Color's Mapping for Tailwind CSS classes
		const colorMap: Record<string, string> = {
            blue:   "bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800",
            gray:   "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
            red:    "bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900",
            green:  "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900",
            yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900",
            purple: "bg-purple-100 text-purple-800 dark:bg-purple-200 dark:text-purple-900",
            pink:   "bg-pink-100 text-pink-800 dark:bg-pink-200 dark:text-pink-900",
            indigo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-200 dark:text-indigo-900",
        };

		// Default to Gray
        const colorClasses = colorMap[this.token.color] || colorMap.gray;

		// Return the HTML string for the badge
		return `<span class="${colorClasses} ${baseClasses}">${this.token.value}</span>`;
    }	
}