import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddForm from './components/AddForm/AddForm';
import Header from './components/Header/Header';
import Settings from './components/Settings/Settings';
import { useTelegram } from './hooks/useTelegram';

function App() {
	const {tg} = useTelegram();

	useEffect(() => {
		tg.ready();
	}, [tg]);

  return (
    <div className="App">
      <Header/>
			
			<Routes>
				<Route index element={<Settings />} />
				<Route path="words/add" element={<AddForm/>} />
			</Routes>
    </div>
  );
}

export default App;
