import {
	Body,
	Footer,
	Links,
	Navbar,
	ShoppingCartProvider,
} from './components';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const queryClient = new QueryClient();

const App = () => {
	const [resetToggle, setResetToggle] = useState(false);
	const handleHomeClick = () => setResetToggle(false);

	return (
		<QueryClientProvider client={queryClient}>
			<ShoppingCartProvider>
				<Navbar onHandleHomeClick={handleHomeClick} />
				<Body
					onResetToggle={resetToggle}
					onSetResetToggle={setResetToggle}
				/>
			</ShoppingCartProvider>
			<Footer>
				<Links />
			</Footer>
		</QueryClientProvider>
	);
};

export default App;
