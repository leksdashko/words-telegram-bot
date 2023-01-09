import React, { useCallback, useEffect, useState } from 'react';
import { useAxios } from '../../hooks/useAxios';
import { useTelegram } from '../../hooks/useTelegram';
import './AddForm.css';

const AddForm = () => {
	const [phrase, setPhrase] = useState('');
	const [explanation, setExplanation] = useState('');
	const {tg} = useTelegram();
	const [words, setWords] = useState([]);
	const axios = useAxios();

	const chatID = 701704536;

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

	useEffect(() => {
		axios.get('/vocabulary', {
			params: {
				chatId: chatID,
				limit: 10
			}
		})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		})
		.then(function () {
			// always executed
		}); 
	});

	const onChangePhrase = (e) => {
		setPhrase(e.target.value);
	}

	const onChangeExplanation = (e) => {
		setExplanation(e.target.value);
	}

	const addNewWord = () => {
		axios.post('/vocabulary', {
			chatId: chatID,
			word: phrase,
			meaning: explanation
		})
		.then(function (response) {
			setPhrase('');
			setExplanation('');

			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	return (
  	<div className="w-full px-3">
			<div className="mb-5">
				<label className="mb-3 block text-base text-[#07074D]">
					New Phrase
				</label>
				<input
					onChange={onChangePhrase} 
					value={phrase}
					type="text"
					placeholder="Phrase"
					className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base text-[#6B7280] outline-none focus:shadow-md"
				/>
			</div>
			<div className="mb-5">
				<label className="mb-3 block text-base text-[#07074D]">
					Translation / Explanation
				</label>
				<input
					onChange={onChangeExplanation} 
					value={explanation} 
					type="text"
					placeholder="Meaning"
					className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base text-[#6B7280] outline-none focus:shadow-md"
				/>
			</div>
			<div className=" mb-5">
				<button onClick={addNewWord} className="w-full bg-blue-500 hover:bg-blue-700 text-white py-3 px-4 border rounded">Add new word</button>
			</div>
  	</div>
	)
}

export default AddForm