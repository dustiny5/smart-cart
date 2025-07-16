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
import type { Product } from './components/type';

const queryClient = new QueryClient();

const App = () => {
	const [resetToggle, setResetToggle] = useState(false);
	const handleHomeClick = () => setResetToggle(false);
	const [showProductDetails, setShowProductDetails] = useState<Product>();

	return (
		<QueryClientProvider client={queryClient}>
			<ShoppingCartProvider>
				<Navbar
					onSetResetToggle={setResetToggle}
					onSetShowProductDetails={setShowProductDetails}
					onHandleHomeClick={handleHomeClick}
				/>
				<Body
					onShowProductDetails={showProductDetails}
					onSetShowProductDetails={setShowProductDetails}
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
