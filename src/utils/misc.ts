import { v4 as uuidv4 } from 'uuid';

export const cleanSeed = (seed: string): string => {
	return seed
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]/g, '')
		.trim()
		.substring(0, 20);
};

export const generateUser = (): string => {
	return `Nonogrammer${uuidv4()
		.replace(/[^A-Za-z0-9]/g, '')
		.substring(6)}`;
};

export const cleanUser = (user: string): string => {
	return user
		.replace(/ /g, '')
		.replace(/[^A-Za-z0-9]/g, '')
		.substring(0, 25);
};

export const storageName = (name: string): string => {
	return `infNono:${name}`;
};

export const openExternalLink = (link: string) => {
	window.open(link, '_blank', 'noopener, noreferrer');
};
