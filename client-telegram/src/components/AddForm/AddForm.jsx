import React, { useCallback, useEffect, useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import './AddForm.css';

const AddForm = () => {
	const [phrase, setPhrase] = useState('');
	const [explanation, setExplanation] = useState('');
	const {tg} = useTelegram();

	const onSendData = useCallback(() => {
		const data = {
			phrase,
			explanation
		}

		tg.sendData(JSON.stringify(data));
	}, [phrase, explanation, tg]);

	useEffect(() => {
		tg.MainButton.setParams({
			text: 'Add new word'
		});

		tg.onEvent('mainButtonClicked', onSendData);

		return () => {
			tg.offEvent('mainButtonClicked', onSendData);
		}
	}, [onSendData, tg]);

	useEffect(() => {
		if(!phrase || !explanation){
			tg.MainButton.hide();
		}else{
			tg.MainButton.show();
		}
	}, [phrase, explanation, tg]);

	const onChangePhrase = (e) => {
		setPhrase(e.target.value);
	}

	const onChangeExplanation = (e) => {
		setExplanation(e.target.value);
	}

	return (
		<div className='form'>
			<input className={'input'} onChange={onChangePhrase} value={phrase} type="text" placeholder={'Phrase'} />
			<input className={'input'} onChange={onChangeExplanation} value={explanation} type="text" placeholder={'Translation / Explanation'} />
		</div>
	)
}

export default AddForm