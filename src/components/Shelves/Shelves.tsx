import React, { useEffect, useRef, useState } from 'react';
import { useStore } from 'react-hookstore';
import { IVolume, IVolumes } from '../../types/library';
interface Props {}

const tempToken =
	'ya29.a0AfH6SMD-e5D9emplC08lrI09clE52TGhns37c1tisuy1mg7xNSzNc52WANzv_ly6XkWB8rxnf9Ly_QQamPcB87SP8MI6fWMc-1loh-FAn7pno3ZetrVnVUIYalMy69LmAaiVxrKD3nKlSv7sPhbcHYXqsSODHiCYD30';

const sec = [''];
const INIT_STATE = new Map();

const Shelves = (props: Props) => {
	const [selecredShelves, setSelecredShelves] = useStore<IVolumes>('selecredShelves');
	console.log('Shelves -> volumes', selecredShelves);
	// const [selecredShelves] = useStore<IBookShelves[]>('selecredShelves');
	const latestShelveId = useRef(4);
	// const [{ data, loading, error }, getShelve] = useAxios<{ items: IVolume[] }>(
	// 	`/bookshelves/${latestShelveId.current}/volumes`,
	// 	{
	// 		manual: true,
	// 	}
	// );
	const volumeKey = `shelve_${latestShelveId.current}`;
	const [state, setState] = useState(INIT_STATE);
	// const booksByAuthors = useMemo(() => {
	// 	console.log('booksByAuthors -> volumes[volumeKey]', volumes[volumeKey]);
	// 	if (volumes[volumeKey]) sortBooksByAuthor();
	// }, [volumes]);

	// const getData = async () => {
	// 	await getShelve({
	// 		method: 'get',
	// 		baseURL,
	// 		headers: {
	// 			Authorization: `Bearer ${tempToken}`,
	// 			// Authorization: `Bearer ${user.token}`,
	// 		},
	// 	});
	// };

	// const setVolume = () => {
	// 	if (data && !error) {
	// 		console.log('setVolume -> data', data);
	// 		setSelecredShelves({
	// 			...selecredShelves,
	// 			[volumeKey]: data.items,
	// 		});
	// 	}
	// };

	const sortBooksByAuthor = () => {
		const books = new Map();

		const setAuthorBooks = ({ id, volumeInfo }: IVolume) => {
			const key = volumeInfo.authors.join(' | ');
			const book = { id, ...volumeInfo };
			const prevVal = books.get(key);

			if (prevVal) books.set(key, [...prevVal, { id, ...volumeInfo }]);
			else {
				books.set(key, [book]);
			}
		};

		Object.values(selecredShelves).forEach((books) => {
			books.forEach(setAuthorBooks);
		});

		console.log('sortBooksByAuthor -> books', books);
		setState(books);
	};

	useEffect(() => {
		// getData();
	}, []);

	// useEffect(() => {
	// 	setVolume();
	// }, [data]);

	useEffect(() => {
		console.log('Shelves -> volumes', selecredShelves);
		sortBooksByAuthor();
	}, [selecredShelves]);

	useEffect(() => {
		// getShelve;
	}, [selecredShelves]);

	return <div>{/* {shelves.map((shelve) => (
				<Shelve {...shelve} />
			))} */}s</div>;
};

export default Shelves;
