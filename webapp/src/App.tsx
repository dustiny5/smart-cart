import { Layout, Success } from './components';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />} />
				<Route path="/success" element={<Success />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
