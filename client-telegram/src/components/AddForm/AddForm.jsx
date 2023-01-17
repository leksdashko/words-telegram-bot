import React, { useCallback, useEffect, useState } from 'react';
import { useAxios } from '../../hooks/useAxios';
import { useTelegram } from '../../hooks/useTelegram';
import { useSearchParams } from "react-router-dom";
import { PaperClipIcon } from '@heroicons/react/24/solid'
import './AddForm.css';

const AddForm = () => {
	const [phrase, setPhrase] = useState('');
	const [explanation, setExplanation] = useState('');
	const {tg} = useTelegram();
	const [words, setWords] = useState([]);
	const axios = useAxios();
	const [searchParams] = useSearchParams();
	const chatId = searchParams.get("chatId");

	const onSendData = useCallback(() => {
		const data = {
			words
		}

		tg.sendData(JSON.stringify(data));
	}, [phrase, explanation, tg]);

	useEffect(() => {
		tg.MainButton.setParams({
			text: 'Start learning'
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

	const updateWordsList = () => {
		axios.get('/vocabulary', {
			params: {
				chatId: chatId,
				limit: 10
			}
		})
		.then(function ({data}) {
			setWords(data);
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	useEffect(() => {
		updateWordsList();
	}, []);

	const onChangePhrase = (e) => {
		setPhrase(e.target.value);
	}

	const onChangeExplanation = (e) => {
		setExplanation(e.target.value);
	}

	const addNewWord = () => {
		axios.post('/vocabulary', {
			chatId: chatId,
			word: phrase,
			meaning: explanation
		})
		.then(function (response) {
			setPhrase('');
			setExplanation('');

			updateWordsList();
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	return (
  	<div className="w-full px-3">
			<div className="mb-5">
				<label className="mb-3 block text-base text-[#07074D]">
					New Word / Phrase
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

			<ul className="divide-y divide-gray-200">
				{words && words.map((word) => (
					<li key={word.id} className="py-3 flex">
						<div className="px-2 text-xs text-gray-400">
							<PaperClipIcon className="h-6 align-middle w-6 text-blue-500"/>
						</div>
						<div className="ml-3">
							<p className="text-sm font-medium text-gray-900">{word.value}</p>
							<p className="text-sm text-gray-500">{word.meaning}</p>
						</div>
					</li>
				))}
			</ul>
  	</div>
	)
}

export default AddForm