import React from 'react'
import { useTelegram } from '../../hooks/useTelegram';
import Button from '../Button/Button';
import './Header.css';

const Header = () => {
	const {user} = useTelegram();

	return (
		<header className={'header'}>
			<span className={'username'}>
				{user?.username ? user?.username : 'Hi there!'}
			</span>
		</header>
	)
}

export default Header;