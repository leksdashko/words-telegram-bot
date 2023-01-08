import React from 'react'
import { useTelegram } from '../../hooks/useTelegram';
import './Header.css';

const Header = () => {
	const {user} = useTelegram();

	return (
		<header className={'header px-3'}>
			<span className={'username'}>
				{user?.username ? user?.username : 'Hi there!'}
			</span>
		</header>
	)
}

export default Header;