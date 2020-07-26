import { createStore } from 'react-hookstore';
import { IUser } from '../types/user';

createStore<IUser>('user', {
	name: '',
	email: '',
	imageUrl: '',
	lastName: '',
	givinName: '',
	token: '',
});
