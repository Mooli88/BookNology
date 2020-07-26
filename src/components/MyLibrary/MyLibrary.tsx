import { AxiosRequestConfig } from 'axios';
import useAxios from 'axios-hooks';
import React, { useEffect } from 'react';
import { useStore } from 'react-hookstore';
import { baseURL } from '../..';
import { IBookShelves, IVolume } from '../../types/library';
import { IUser } from '../../types/user';
import BookGalary from '../BookGalary/BookGalary';
import Login from '../Login/Login';
import Menu from '../Menu/Menu';
import Shelves from '../Shelves/Shelves';
import Sidebar from '../Sidebar/Sidebar';

export const GET = (token: string): AxiosRequestConfig => ({
	method: 'get',
	baseURL,
	headers: {
		Authorization: `Bearer ${token}`,
		// Authorization: `Bearer ${user.token}`,
	},
});

interface Props {}

const MyLibrary = (props: Props) => {
	const [user] = useStore<IUser>('user');
	const [shelves, setShelves] = useStore<IBookShelves[]>('shelves');
	const [{ data: shelvesData, loading: shelvesLoading, error: shelvesError }, getShelves] = useAxios('/bookshelves', {
		manual: true,
	});
	const [{ data: volumesData, loading: volumesLoading, error: voluemsErr }, getVolumes] = useAxios<{
		totalItems: number;
		items: IVolume[];
	}>(`/volumes`, {
		manual: true,
	});

	const getData = async () => {
		await getShelves(GET(user.token));
		// await getVolumes(get);
	};

	const onShelveSelect = async (id: string) => {
		const { data } = await getVolumes({
			...GET(user.token),
			baseURL: `${baseURL}/bookshelves/${id}`,
		});

		const volumes = data && data.totalItems ? data.items! : [];
		return { id, volumes };
	};

	useEffect(() => {
		if (shelvesData && !shelvesError) {
			setShelves(shelvesData.items);
		}
	}, [shelvesData]);

	useEffect(() => {
		if (user.token) {
			console.log('useEffect - state', user.token);
			getData();
		}
	}, [user.token]);

	return (
		<div>
			{!user.token ? (
				<Login />
			) : (
				<Sidebar
					renderMenu={() => (
						<Menu
							items={shelves.map(({ id, title: label }) => ({ id, label }))}
							onSelect={onShelveSelect}
							defaultItemId='4'
						/>
					)}>
					<>
						{shelves.length && <BookGalary />}
						{volumesData && volumesData.totalItems ? <Shelves /> : <h1>Library is empty</h1>}
					</>
				</Sidebar>
			)}
		</div>
	);
};

export default MyLibrary;
