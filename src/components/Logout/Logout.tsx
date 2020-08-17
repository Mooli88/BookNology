import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useStore } from 'react-hookstore';
import { INIT_USER } from '../../store/user';
import { IUser } from '../../types/user';

const { REACT_APP__CLIENT_ID: CLIENT_ID } = process.env;

const Logout = () => {
	const [user, setUser] = useStore<IUser>('user');

	return user.token ? (
		<GoogleLogout
			clientId={`${CLIENT_ID}.apps.googleusercontent.com`}
			buttonText='Logout'
			onLogoutSuccess={() => setUser({ ...INIT_USER })}
		/>
	) : null;
};

export default Logout;
