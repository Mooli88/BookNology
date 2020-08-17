import useAxios from 'axios-hooks';
import React, { useEffect } from 'react';
import { useStore } from 'react-hookstore';
import { IBookShelves, IVolume } from '../../types/library';
import { IUser } from '../../types/user';
import { axiosReq } from '../../utils';
import Filter from '../Filter/Filter';
import Login from '../Login/Login';
import Menu from '../Menu/Menu';
import Shelves from '../Shelves/Shelves';
import Sidebar from '../Sidebar/Sidebar';

interface Props {}

const MyLibrary = () => {
	const [user] = useStore<IUser>('user');
	const [shelves, setShelves] = useStore<IBookShelves[]>('shelves');
	const [{ data: shelvesData, loading: shelvesLoading, error: shelvesError }, getShelves] = useAxios('/bookshelves', {
		manual: true,
	});
	const [, getVolumes] = useAxios<{
		totalItems: number;
		items: IVolume[];
	}>(`/volumes`, {
		manual: true,
	});

	const getData = async () => {
		await getShelves(axiosReq(user.token));
	};

	const onShelveSelect = async (id: string) => {
		const { data } = await getVolumes(axiosReq(user.token, `/bookshelves/${id}`));
		const volumes = data && data.totalItems ? data.items! : [];
		return { id, volumes };
	};

	useEffect(() => {
		if (shelvesData && !shelvesError) {
			const _shelves = shelvesData.items.filter(({ id }: IBookShelves) => id !== 9);
			setShelves(_shelves);
		}
	}, [shelvesData]);

	useEffect(() => {
		if (user.token) {
			getData();
		}
	}, [user.token]);

	//TODO add Loading component
	// if (shelvesLoading) return <h1>Loading...</h1>;
	if (!user.token) return <Login />;

	return (
		<div>
			<Sidebar
				renderMenu={() => (
					<Menu
						items={shelves.map(({ id, title: label }) => ({ id, label }))}
						onSelect={onShelveSelect}
						defaultItemId='4'
					/>
				)}>
				<>
					<Filter />
					<Shelves />
				</>
			</Sidebar>
		</div>
	);
};

export default MyLibrary;
