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
	firstTime: boolean;
};

export const colorsStore = writable<AllowedColors>({
	buttonsBackgroundColor: '#151515',
	buttonsBorderColor: '#00000015',
	iconsColor: '#8075ff',
	descriptionColor: '#b3b6b7',
	usernameColor: '#f8fafc',
	backgroundColor: '#222222',
	buttonTextColor: '#ffffff',
	buttonBorderSize: '1px',
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
		iconsColor: user.iconsColor,
		usernameColor: user.usernameColor,
		firstTime: false
	};
}
