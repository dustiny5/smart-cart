import { Carousel, Navbar } from './components';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Navbar />
			<Carousel />
		</QueryClientProvider>
	);
};

export default App;
