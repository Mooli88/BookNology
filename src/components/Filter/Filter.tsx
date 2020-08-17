import React, { useEffect, useState } from 'react';
import { useStore } from 'react-hookstore';
import { IVolume, IVolumes } from '../../types/library';
import style from './Filter.module.css';

interface Props {}

const Filter = () => {
	const [categoriesState, setCategoriesState] = useState<string[]>([]);
	const [selectedShelves] = useStore<IVolumes>('selectedShelves');
	const [, setSelectedCategory] = useStore<string>('selectedCategory');

	const setCategories = () => {
		const categories = new Set<string>();

		const getCategories = ({ volumeInfo }: IVolume) => {
			volumeInfo.categories.forEach((category) => categories.add(category));
		};

		Object.values(selectedShelves).forEach((books) => {
			books.forEach(getCategories);
		});

		setCategoriesState([...categories]);
	};

	useEffect(() => {
		setCategories();
	}, [selectedShelves]);

	return (
		<div className={style.root}>
			<select
				data-testid='select_category'
				defaultValue='all'
				onChange={({ target }) => {
					setSelectedCategory(target.value);
				}}>
				<option value='all'>All Genres</option>
				{categoriesState.map((category) => (
					<option key={category} value={category} data-testid={category}>
						{category.toLowerCase()}
					</option>
				))}
			</select>
		</div>
	);
};

export default Filter;
