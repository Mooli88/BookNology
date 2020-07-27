import React, { ReactChild, useState } from 'react';
import { useStore } from 'react-hookstore';
import { IUser } from '../../types/user';
import Login from '../Login/Login';
import style from './Sidebar.module.css';

const {
	root,
	toolbar,
	toolbar_item,
	menuIcon,
	menuIcon__close,
	menuIcon__open,
	sidebar,
	sidebar__close,
	content,
	menu,
} = style;

interface Props {
	renderMenu: () => ReactChild;
	children: ReactChild;
}

const Sidebar = ({ renderMenu, children }: Props) => {
	const [user] = useStore<IUser>('user');
	const [menuState, setMenuState] = useState(true);

	return (
		<div className={root}>
			<header className={toolbar}>
				<div className={toolbar_item}>{user.name ? user.name : <Login />}</div>
				<div className={toolbar_item} onClick={() => setMenuState(!menuState)}>
					<span className={`${menuIcon} ${menuState ? menuIcon__close : menuIcon__open}`}></span>
				</div>
			</header>
			<main>
				<div className={`${sidebar} ${menuState ? '' : sidebar__close}`}>
					<div className={menu}>{renderMenu()}</div>
				</div>
				<div className={content}>{children}</div>
			</main>
		</div>
	);
};

export default Sidebar;
