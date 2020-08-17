import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { createStore, useStore } from 'react-hookstore';
import { IVolume, IVolumes } from '../../types/library';
import Filter from './Filter';

const MockVolume = (categories: string[]): IVolume => {
	const vol = {
		volumeInfo: {
			categories,
		},
	};
	return vol as IVolume;
};

const renderHookStore = (storeName: string) => {
	let storeHook: any = [];
	const TestComponent = () => {
		storeHook = useStore(storeName)[0];
		return null;
	};

	render(<TestComponent />);

	return () => storeHook;
};

beforeAll(() => {
	createStore<IVolumes>('selectedShelves', {
		4: [MockVolume(['History']), MockVolume(['Fiction'])],
	});
	createStore<string | null>('selectedCategory', 'all');
});

afterEach(cleanup);

test('default value', () => {
	const { getByDisplayValue } = render(<Filter />);
	getByDisplayValue('All Genres');
});

test('Select option', () => {
	const store = renderHookStore('selectedCategory');
	const { getByDisplayValue, getByText, getByTestId } = render(<Filter />);

	const selectedOpts = /^Fiction$/i;
	const scienceOpt = getByText(selectedOpts);

	fireEvent.change(getByTestId('select_category'), {
		target: { value: scienceOpt.getAttribute('value') },
	});

	getByDisplayValue(selectedOpts);
	expect(store()).toMatch(selectedOpts);
});

test.only('Select option with userEvent', () => {
	const store = renderHookStore('selectedCategory');
	const { getByDisplayValue, getByTestId } = render(<Filter />);
	const selectedOptVal = /^Fiction$/i;

	userEvent.selectOptions(getByTestId('select_category'), 'Fiction');

	const selectedOpt = getByTestId('Fiction');
	selectedOpt.getAttribute('selected');
	console.log("selectedOpt.getAttribute('selected')", selectedOpt.getAttribute('selected'));
	getByDisplayValue(selectedOptVal);
	expect(store()).toMatch(selectedOptVal);
	// expect(selectedOpt);
});
