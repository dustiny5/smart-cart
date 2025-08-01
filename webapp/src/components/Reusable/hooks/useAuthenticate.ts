import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
type CognitoJwtResponse = {
	access_token: string;
	id_token: string;
	refresh_token: string;
	token_type: string;
	expires_in: number;
};

const useAuthenticate = () => {
	const [searchParams] = useSearchParams();
	const code = searchParams.get('code');

	const { data, isLoading, error } = useQuery<CognitoJwtResponse>({
		queryKey: ['cognitoToken'],
		queryFn: async () => {
			const response = await fetch(
				`${
					import.meta.env.VITE_SMART_CART_API_URL
				}/code/token?code=${code}`,
				{
					method: 'POST',
				}
			);
			if (!response.ok) {
				throw new Error(
					'Something went wrong authenticating the user.'
				);
			}
			return response.json();
		},
		enabled: !!code,
	});
	// TODO: Save token locally
	return { data, isLoading, error };
};

export default useAuthenticate;
