import decodeJwt from '../../util/decodeJwt';
import { useAuthenticate } from '../Reusable/hooks';

type LoginRegisterProps = {
	className: string;
};

const LoginRegister = ({ className }: LoginRegisterProps) => {
	const clientId = import.meta.env.VITE_AWS_COGNITO_CLIENT_ID;
	const domain = import.meta.env.VITE_AWS_COGNITO_DOMAIN;
	const redirectUri = import.meta.env.VITE_REDIRECT_SIGN_IN;
	const responseType = 'code';
	const scope = import.meta.env.VITE_AWS_COGNITO_SCOPE;

	const loginUrl = `${domain}/login?client_id=${clientId}&response_type=${responseType}&scope=${encodeURIComponent(
		scope
	)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
	const { data } = useAuthenticate();
	const decodedJwt = data && decodeJwt(data.id_token);
	return (
		<button
			className={className}
			onClick={() => (window.location.href = loginUrl)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="size-6"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
				/>
			</svg>
			{decodedJwt ? (
				<div>{decodedJwt.given_name}</div>
			) : (
				<div>Login / Register</div>
			)}
		</button>
	);
};

export default LoginRegister;
