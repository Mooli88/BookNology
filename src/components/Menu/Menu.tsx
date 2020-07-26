import React, { useEffect } from 'react';
import { useStore } from 'react-hookstore';
import { SelecredShelvesAction } from '../../store/library';

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
	const [selectedShelves, dispatchSelectedShelves] = useStore('selectedShelves');

	const onItemSelect = async (id: string) => {
		const payload = await onSelect(id);
		dispatchSelectedShelves({
			type: SelecredShelvesAction.SELECT_SHELVE,
			payload,
		});
	};

	const renderItems = () =>
		items.map(({ id, label }) => (
			<li key={id} onClick={() => onItemSelect(id.toString())}>
				{label}
			</li>
		));

	useEffect(() => {
		onItemSelect(defaultItemId);
	}, []);

	return (
		<div>
			<ul>{renderItems()}</ul>
		</div>
	);
};

export default ShelveMenu;
