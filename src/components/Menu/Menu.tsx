import React, { useEffect } from 'react';
import { useStore } from 'react-hookstore';
import { SelecredShelvesAction } from '../../store/library';
import { IVolumes } from '../../types/library';
import styles from './Menu.module.css';

interface Item {
	id: string | number;
	label: string;
}

interface Props {
	items: Item[];
	defaultItemId: string;
	onSelect: (id: string) => Promise<any>;
}

const ShelveMenu = ({ items, defaultItemId, onSelect }: Props) => {
	const [selectedShelves, dispatchSelectedShelves] = useStore<IVolumes, any>('selectedShelves');

	const onItemSelect = async (id: string) => {
		const payload = await onSelect(id);
		dispatchSelectedShelves({
			type: SelecredShelvesAction.SELECT_SHELVE,
			payload,
		});
	};

	const getEmoji = (id: string | number) => {
		const shelve = selectedShelves[id];

		if (shelve) {
			if (shelve.length) return '📗 ';
			return '🤷‍♂️ ';
		} else {
			return '';
		}
	};

	const renderItems = () =>
		items.map(({ id, label }) => (
			<li key={id} onClick={() => onItemSelect(id.toString())}>
				{getEmoji(id)}
				{label}
			</li>
		));

	useEffect(() => {
		onItemSelect(defaultItemId);
	}, [defaultItemId]);

	return (
		<div className={styles.root}>
			<ul className={styles.items}>{renderItems()}</ul>
		</div>
	);
};

export default ShelveMenu;
