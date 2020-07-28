import Color from 'color';
import brandStore from './brand-store';

const defaultColours = [
	{ name: 'primary', value: '#333' },
	{ name: 'secondary', value: '#222' },
	{ name: 'tertiary', value: '#555' },
];

const defaultBodyFont = 'Lato';
const allowedFonts = ['lato', 'arial', 'helvetica', 'courier'];

const convertToRgb = (c) => Color(c).rgb().string();

export function validateBodyFont(font) {
	return allowedFonts.includes(font.toLowerCase());
}

export function getBodyFont(font) {
	const bodyFont = validateBodyFont(font) ? bodyFont : defaultBodyFont;
	return bodyFont;
}

export function setColours(colours = defaultColours) {
	const newColours = {};

	colours.forEach(({ name, value }) => {
		newColours[name] = convertToRgb(value);
	});

	return newColours;
}

export function buildTheme(colours = defaultColours, bodyFont = defaultBodyFont) {
	return {
		colours: setColours(colours),
		bodyFont: getBodyFont(bodyFont),
	};
}

export default function getBranding(user = {}) {
	if (user.brandId) {
		const brands = brandStore.getAll() || [];
		const brandDetails = brands.find(({ id }) => id === user.brandId);

		if (brandDetails) return buildTheme(brandDetails.colours, brandDetails.bodyFont);
	}

	return buildTheme();
}
