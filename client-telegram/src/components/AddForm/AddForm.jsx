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
  <div className="mx-auto w-full max-w-[550px]">
      <div className="-mx-3 flex flex-wrap">
        <div className="w-full px-3">
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              New Phrase
            </label>
            <input
							onChange={onChangePhrase} 
							value={phrase}
              type="text"
              placeholder="Phrase"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
        <div className="w-full px-3">
					<div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Translation / Explanation
            </label>
            <input
							onChange={onChangeExplanation} 
							value={explanation} 
              type="text"
              placeholder="Translation"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
      </div>
  </div>
	)
}

export default AddForm