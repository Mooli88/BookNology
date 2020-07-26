import React from 'react';
import GoogleLogin from 'react-google-login';
import { useStore } from 'react-hookstore';
import { IUser } from '../../types/user';

interface Props {}

const { REACT_APP__CLIENT_ID: CLIENT_ID } = process.env;

const Login = (props: Props) => {
	const [, setUser] = useStore<IUser>('user');

	const onSignIn = (googleUser: any) => {
		const profile = googleUser.getBasicProfile();
		console.log('Login!');
		// const token = googleUser.getAuthResponse().access_token
		setUser({
			name: profile.getName(),
			email: profile.getEmail(),
			imageUrl: profile.getImageUrl(),
			lastName: profile.getFamilyName(),
			givinName: profile.getGivenName(),
			token: googleUser.getAuthResponse().access_token,
		});
	};

	return (
		<div>
			<GoogleLogin
				clientId={`${CLIENT_ID}.apps.googleusercontent.com`}
				buttonText='Login'
				onSuccess={onSignIn}
				// onFailure={onSignIn}
				scope='profile email https://www.googleapis.com/auth/books'
				// cookiePolicy={'single_host_origin'}
				autoLoad={false}
			/>
		</div>
	);
};

export default Login;
