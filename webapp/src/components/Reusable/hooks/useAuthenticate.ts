import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

type CognitoUserInfoResponse = {
	givenName: string;
};

const useAuthenticate = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const code = searchParams.get('code');

	useEffect(() => {
		if (code) {
			searchParams.delete('code');
			setSearchParams(searchParams);
		}
	}, [code]);

	const {
		data: dataGetUserInfo,
		isLoading: isLoadingGetUserInfo,
		error: errorGetUserInfo,
	} = useQuery<CognitoUserInfoResponse>({
		queryKey: ['getUserInfo'],
		queryFn: async () => {
			const response = await fetch(
				`${import.meta.env.VITE_SMART_CART_API_URL}/user`,
				{
					method: 'GET',
					credentials: 'include',
				}
			);
			if (!response.ok) {
				throw new Error(
					'Something went wrong authenticating the user.'
				);
			}
			return response.json();
		},
		enabled: !code,
		retry: false,
	});

	const { data, isLoading, error } = useQuery<CognitoUserInfoResponse>({
		queryKey: ['cognitoToken'],
		queryFn: async () => {
			const response = await fetch(
				`${
					import.meta.env.VITE_SMART_CART_API_URL
				}/code/token?code=${code}`,
				{
					method: 'POST',
					credentials: 'include',
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

	if (dataGetUserInfo) {
		return {
			data: dataGetUserInfo,
			isLoading: isLoadingGetUserInfo,
			error: errorGetUserInfo,
		};
	}
	return { data, isLoading, error };
};

export default useAuthenticate;
