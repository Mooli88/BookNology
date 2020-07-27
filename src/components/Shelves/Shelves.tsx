import React, { useEffect, useRef, useState } from 'react';
import { useStore } from 'react-hookstore';
import { Book, IVolume, IVolumes } from '../../types/library';
import BookGalary from '../BookGalary/BookGalary';
import Shelve from './Shelve';
import style from './Shelves.module.css';

interface Props {}

const INIT_STATE = new Map();

const Shelves = (props: Props) => {
	const [selecredShelves, setSelecredShelves] = useStore<IVolumes>('selectedShelves');
	const latestShelveId = useRef(4);
	const [booksState, setBooksState] = useState<Map<string, Book[]>>(INIT_STATE);

	const sortBooksByAuthor = () => {
		const books = new Map();

		const setAuthorBooks = ({ id, volumeInfo }: IVolume) => {
			const key = volumeInfo.authors.join(' | ');
			const book = { id, ...volumeInfo };
			const prevVal: Book[] = books.get(key);

			if (prevVal) {
				const isNewVal = !prevVal.some((v) => id === v.id) ? [{ id, ...volumeInfo }] : [];
				books.set(key, [...prevVal, ...isNewVal]);
			} else {
				books.set(key, [book]);
			}
		};
		Object.values(selecredShelves).forEach((books) => {
			books.forEach(setAuthorBooks);
		});

		setBooksState(books);
	};

	useEffect(() => {
		sortBooksByAuthor();
	}, [selecredShelves]);

	const renderBooks = () => {
		const _books = books.map(([authors, books]) => <Shelve {...{ authors, books }} key={authors} />);
		_books.splice(2, 0, <BookGalary key={'gallery'} />);
		return _books;
	};

	const books = [...booksState];

	return <div className={style.root}>{books.length ? renderBooks() : <h1>🕸️ Library is empty 🕸️</h1>}</div>;
};

export default Shelves;
