import React, { useEffect, useRef, useState } from 'react';
import { useStore } from 'react-hookstore';
import { Book, IVolume, IVolumes } from '../../types/library';
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

		console.log('sortBooksByAuthor -> books', books);
		setBooksState(books);
	};

	useEffect(() => {
		// getData();
	}, []);

	useEffect(() => {
		console.log('Shelves -> volumes', selecredShelves);
		sortBooksByAuthor();
	}, [selecredShelves]);

	return (
		<div className={style.root}>
			{[...booksState].map(([authors, books]) => (
				<Shelve {...{ authors, books }} key={authors} />
			))}
		</div>
	);
};

export default Shelves;
