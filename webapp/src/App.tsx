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
	const [showProductDetails, setShowProductDetails] = useState<Product>();

	return (
		<QueryClientProvider client={queryClient}>
			<ShoppingCartProvider>
				<Navbar onSetShowProductDetails={setShowProductDetails} />
				<Body
					showProductDetails={showProductDetails}
					onSetShowProductDetails={setShowProductDetails}
				/>
			</ShoppingCartProvider>
			<Footer>
				<Links />
			</Footer>
		</QueryClientProvider>
	);
};

export default App;
