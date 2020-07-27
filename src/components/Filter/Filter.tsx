import React, { useEffect, useState } from 'react';
import { useStore } from 'react-hookstore';
import { IVolume, IVolumes } from '../../types/library';
import style from './Filter.module.css';

interface Props {}

const Filter = () => {
	const [categoriesState, setCategoriesState] = useState<string[]>([]);
	const [selecredShelves] = useStore<IVolumes>('selectedShelves');
	const [cat, setSelectedCategory] = useStore<string>('selectedCategory');
	const setCategories = () => {
		const categories = new Set<string>();

		const getCategories = ({ id, volumeInfo }: IVolume) => {
			volumeInfo.categories.forEach((category) => categories.add(category));
		};

		Object.values(selecredShelves).forEach((books) => {
			books.forEach(getCategories);
		});

		setCategoriesState([...categories]);
	};

	useEffect(() => {
		setCategories();
	}, [selecredShelves]);

	return (
		<div className={style.root}>
			<select
				defaultValue='all'
				onChange={({ target }) => {
					setSelectedCategory(target.value);
				}}>
				<option value='all'>All Genres</option>
				{categoriesState.map((category) => (
					<option key={category} value={category}>
						{category.toLowerCase()}
					</option>
				))}
			</select>
		</div>
	);
};

export default Filter;
