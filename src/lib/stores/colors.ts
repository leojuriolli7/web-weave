import type { User } from '$drizzle/schema';
import { writable } from 'svelte/store';

export type AllowedColors = {
	buttonsBackgroundColor: string;
	buttonsBorderColor: string;
	iconsColor: string;
	descriptionColor: string;
	usernameColor: string;
	backgroundColor: string;
	buttonTextColor: string;
	buttonBorderSize: string;
	buttonFontWeight: string;

	gradientColors: string[];
	gradientDegrees: number;
	gradient: boolean;

	firstTime: boolean;
};

export const colorsStore = writable<AllowedColors>({
	buttonsBackgroundColor: '#151515',
	buttonsBorderColor: '#00000015',
	buttonFontWeight: '400',
	iconsColor: '#8075ff',
	descriptionColor: '#b3b6b7',
	usernameColor: '#f8fafc',
	backgroundColor: '#222222',
	buttonTextColor: '#ffffff',
	buttonBorderSize: '1px',
	gradientColors: ['#fff989', '#89d9ff'],
	gradientDegrees: 45,
	gradient: false,
	firstTime: true
});

export function getColorsFromUser(user: User) {
	return {
		backgroundColor: user.backgroundColor,
		buttonBorderSize: user.buttonBorderSize,
		buttonsBackgroundColor: user.buttonsBackgroundColor,
		buttonsBorderColor: user.buttonsBorderColor,
		buttonTextColor: user.buttonTextColor,
		descriptionColor: user.descriptionColor,
		buttonFontWeight: user.buttonFontWeight,
		iconsColor: user.iconsColor,
		usernameColor: user.usernameColor,
		gradientColors: [user.firstGradientColor, user.secondGradientColor],
		gradientDegrees: user.gradientDegrees,
		gradient: user.gradient,
		firstTime: false
	};
}
