import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddForm from './components/AddForm/AddForm';
import Button from './components/Button/Button';
import Header from './components/Header/Header';
import Settings from './components/Settings/Settings';
import { useTelegram } from './hooks/useTelegram';

function App() {
	const {tg, onClose} = useTelegram();

	useEffect(() => {
		tg.ready();
	}, [tg]);

  return (
    <div className="App bg-slate-100">
      <Header/>
			
			<Routes>
				<Route index element={<Settings />} />
				<Route path="words/add" element={<AddForm/>} />
			</Routes>

			<Button onClick={onClose}>Close</Button>
    </div> 
  );
}

export default App;
