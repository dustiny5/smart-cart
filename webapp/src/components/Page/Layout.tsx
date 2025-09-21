import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ShoppingCartProvider } from '../Reusable';
import { Navbar } from '../Header';
import { Body } from '../Body';
import { Footer, Links } from '../Footer';
import { useState } from 'react';
import type { Product } from '../type';
import { ChatBot } from '../ChatBot';

const Layout = () => {
	const queryClient = new QueryClient();
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
			<ChatBot />
		</QueryClientProvider>
	);
};

export default Layout;
