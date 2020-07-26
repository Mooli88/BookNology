import { createStore } from 'react-hookstore';
import { IBookShelves, IVolume, IVolumes } from '../types/library';

export enum SelecredShelvesAction {
	SELECT_SHELVE = 'select_shelve',
	DESELECT_SHELVE = 'deselect_shelve',
}

const selecredShelvesReducer = (
	state: IVolumes,
	action: { type: SelecredShelvesAction; payload: { id: number | string; volumes: IVolume[] } }
) => {
	console.log('payload', action);
	switch (action.type) {
		case SelecredShelvesAction.SELECT_SHELVE:
			return {
				...state,
				[action.payload.id]: action.payload.volumes,
			};
		// return [...state, action.payload];

		case SelecredShelvesAction.DESELECT_SHELVE:
			const _state = { ...state };
			delete _state[action.payload.id];
			return _state;
		// return state.filter(({ title }) => title !== action.payload.title);

		default:
			return state;
	}
};

createStore<IBookShelves[]>('shelves', []);
createStore<IVolumes>('selecredShelves', {}, selecredShelvesReducer);
createStore<IVolumes>('volumes', {});
