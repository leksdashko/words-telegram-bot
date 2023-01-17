import './App.css';

function App() {
	const telegramLink = process.env.REACT_APP_TELEGRAM_URL;

  return (
    <div className="bg-white">
			<div className="container mx-auto max-h-full">
				<div className="flex flex-col justify-between py-12 h-screen">
					<div className="header flex justify-between">
						<div className="logo">
							<a href="/">
								<svg xmlns="http://www.w3.org/2000/svg" className="text-blue-500 mr-2 inline-block w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
									<path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
									<path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
								</svg>
								
								<span className="font-medium text-lg">wordsplan</span>
							</a>
						</div>
						<div className="menu flex">
							<a className="inline-block ml-5" href="/">About</a>
							<a className="inline-block ml-5" href="/">Pricing</a>
							<a className="inline-block ml-5" href="/terms">Terms</a>
						</div>
					</div>

					<div className="content relative">
						<div className="relative z-10">
							<div className="font-bold text-3xl text-slate-900 mb-3">Bring technoogy to your life</div>
							<div className="text-slate-300 mb-7">Use automated bot in telegram to solve<br/>and control your household problems</div>
							<a href={telegramLink} className="inline-block rounded-full px-10 py-2 bg-blue-500 text-white">Launch bot</a>
						</div>
						<div className="main-image"></div>
					</div>

					<div className="footer">
						<a href={telegramLink}>Telegram Icon</a>
					</div>
				</div>
			</div>
		</div>
  );
}

export default App;
