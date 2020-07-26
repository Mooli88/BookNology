import React from 'react';
import { IVolumeInfo } from '../../types/library';
import BookCard from '../BookCard/BookCard';
import style from './Shelves.module.css';

interface Book extends IVolumeInfo {
	id: string;
}

interface Props {
	authors: string;
	books: Book[];
}

const Shelve = ({ authors, books }: Props) => {
	// const [shelves] = useStore<IBookShelves[]>('shelves');
	// const shelveInfo = useMemo(() => {
	// 	return shelves.find(({ id }) => +shelveId === id);
	// }, []);

	return (
		<div className={style.shelve}>
			<h1>{authors}</h1>
			<div className={style.books}>
				{books.map((book) => (
					<BookCard {...book} key={book.id} />
				))}
			</div>
		</div>
	);
};

export default Shelve;
