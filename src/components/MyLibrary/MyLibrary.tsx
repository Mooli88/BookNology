import { AxiosRequestConfig } from 'axios';
import useAxios from 'axios-hooks';
import React, { useEffect } from 'react';
import { useStore } from 'react-hookstore';
import { baseURL } from '../..';
import { SelecredShelvesAction } from '../../store/library';
import { IBookShelves, IVolume } from '../../types/library';
import { IUser } from '../../types/user';
import Login from '../Login/Login';
import Shelves from '../Shelves/Shelves';

const tempToken =
	'ya29.a0AfH6SMA0IhYJldrta89zr2WTVfqyQvR8ZbduRRBMEBggjwu0lVioOgpVMrdTQ9PW9I2tBL1Wjir8Xesjqa9_8H13T6tzBGAlYj-1XTEwK0zEmrCTMCUtsCJDuQwOs816Ui2oTw3qmYnSvDA-Yvcrr5Ns9uubN5gcW-Y';

const GET = (token: string): AxiosRequestConfig => ({
	method: 'get',
	baseURL,
	headers: {
		Authorization: `Bearer ${token}`,
		// Authorization: `Bearer ${user.token}`,
	},
});

interface Props {}

const MyLibrary = (props: Props) => {
	const [user, setUser] = useStore<IUser>('user');
	const [shelves, setShelves] = useStore<IBookShelves[]>('shelves');
	const [selectedShelves, dispatchSelectedShelves] = useStore('selecredShelves');
	console.log('MyLibrary -> selectedShelves', selectedShelves);
	const [{ data: shelvesData, loading: shelvesLoading, error: shelvesError }, getShelves] = useAxios('/bookshelves', {
		manual: true,
	});
	const [{ data: volumesData, loading: volumesLoading, error: voluemsErr }, getVolumes] = useAxios<{
		items: IVolume[];
	}>(`/bookshelves/4/volumes`, {
		manual: true,
	});

	shelves.length && console.log('MyLibrary -> shelves', shelves);
	console.log('volumesData', volumesData);

	const getData = async () => {
		const get = GET(tempToken);

		await getShelves(get);
		await getVolumes(get);
	};

	useEffect(() => {
		if (shelvesData && !shelvesError) {
			setShelves(shelvesData.items);
		}
	}, [shelvesData]);

	useEffect(() => {
		if (volumesData && !voluemsErr) {
			dispatchSelectedShelves({
				type: SelecredShelvesAction.SELECT_SHELVE,
				payload: { id: '2', volumes: volumesData.items },
			});
		}
	}, [volumesData]);

	useEffect(() => {
		// if (user.token) {
		if (tempToken) {
			console.log('useEffect - state', user.token);
			getData();
		}
	}, [user.token]);

	return (
		<div>
			{!user.token && <Login />}
			{shelves.length && <Shelves />}
		</div>
	);
};

export default MyLibrary;
