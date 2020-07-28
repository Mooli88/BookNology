import { createStore } from 'react-hookstore';
import { IUser } from '../types/user';

export const INIT_USER = {
	name: '',
	email: '',
	imageUrl: '',
	lastName: '',
	givinName: '',
	token: '',
};

createStore<IUser>('user', { ...INIT_USER });
