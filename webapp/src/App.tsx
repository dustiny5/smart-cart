import { Navbar, DropDown } from './components';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Navbar />
			<DropDown />
		</QueryClientProvider>
	);
};

export default App;
