export interface imageLinks {
	smallThumbnail: string;
	thumbnail: string;
}

export interface IVolumeInfo {
	title: string;
	authors: string[];
	publisher: string;
	publishedDate: string;
	description: string;
	subtitle: string;
	pageCount: number;
	categories: string[];
	averageRating: number;
	ratingsCount: number;
	imageLinks: imageLinks;
	previewLink: string;
}
export interface IVolume {
	id: string;
	volumeInfo: IVolumeInfo;
}

export interface IVolumes {
	[key: string]: IVolume[];
}

export interface IBookShelves {
	id: number;
	title: string;
	volumeCount: number;
}

export interface IBook extends IVolumeInfo {
	id: string;
}
