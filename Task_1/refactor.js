import Color from 'color';
import brandStore from './brand-store';

const convertToRgb = (c) => Color(c).rgb().string();

const defaultColours = {
	primary: convertToRgb('#333'),
	secondary: convertToRgb('#222'),
	tertiary: convertToRgb('#555'),
};

const defaultBodyFont = 'Lato';
const allowedFonts = ['lato', 'arial', 'helvetica', 'courier'];

export function validateBodyFont(font) {
	return allowedFonts.includes(font.toLowerCase());
}

export function getBodyFont(font) {
	const bodyFont = validateBodyFont(font) ? bodyFont : defaultBodyFont;
	return bodyFont;
}

export function setColours(colours = []) {
	const newColours = {};

	colours.forEach(({ name, value }) => {
		newColours[name] = convertToRgb(value);
	});

	return newColours;
}

export function buildTheme(colours, bodyFont = defaultBodyFont) {
	return {
		bodyFont: getBodyFont(bodyFont),
		colours: colours ? setColours(colours) : { ...defaultColours },
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
