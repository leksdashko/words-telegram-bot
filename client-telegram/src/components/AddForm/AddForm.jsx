import React, { useCallback, useEffect, useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import './AddForm.css';

const AddForm = () => {
	const [country, setCountry] = useState('');
	const [street, setStreet] = useState('');
	const [subject, setSubject] = useState('flat');
	const {tg} = useTelegram();

	const onSendData = useCallback(() => {
		const data = {
			country,
			street,
			subject
		}

		tg.sendData(JSON.stringify(data));
	}, [country, street, subject, tg]);

	useEffect(() => {
		tg.MainButton.setParams({
			text: 'Submit'
		});

		tg.onEvent('mainButtonClicked', onSendData);

		return () => {
			tg.offEvent('mainButtonClicked', onSendData);
		}
	}, [onSendData, tg]);

	useEffect(() => {
		if(!street || !country){
			tg.MainButton.hide();
		}else{
			tg.MainButton.show();
		}
	}, [street, country, tg]);

	const onChangeCountry = (e) => {
		setCountry(e.target.value);
	}

	const onChangeStreet = (e) => {
		setStreet(e.target.value);
	}

	const onChangeSubject = (e) => {
		setSubject(e.target.value);
	}

	return (
		<div className='form'>
			<input className={'input'} onChange={onChangeCountry} value={country} type="text" placeholder={'Country'} />
			<input className={'input'} onChange={onChangeStreet} value={street} type="text" placeholder={'Street'} />
			
			<select value={subject} className={'select'} onChange={onChangeSubject}>
				<option value={'flat'}>Flat</option>
				<option value={'house'}>House</option>
			</select>
		</div>
	)
}

export default AddForm