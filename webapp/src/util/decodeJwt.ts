import { jwtDecode } from 'jwt-decode';

type JwtToken = {
	sub: string;
	email: string;
	given_name: string;
	exp?: number;
	iat?: number;
	[key: string]: any;
};

const decodeJwt = (token: string) => {
	try {
		return jwtDecode<JwtToken>(token);
	} catch {
		return undefined;
	}
};

export default decodeJwt;
