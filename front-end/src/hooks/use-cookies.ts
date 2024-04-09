import { cookieConfig } from '@config/cookie-config';
import { parse } from '@root/src/libs/util';
import { CookieAttributes, useCookies as useNextClientCookies } from 'next-client-cookies';

const useCookies = () => {
	const { get, remove, set } = useNextClientCookies();

	const getCookie = <T>(key: keyof typeof cookieConfig): T => {
		return parse(get(key));
	};

	const removeCookie = (key: keyof typeof cookieConfig, options?: CookieAttributes | undefined) => {
		remove(key, options);
	};

	const setCookie = (key: keyof typeof cookieConfig, value: any, options?: CookieAttributes | undefined) => {
		set(key, JSON.stringify(value), options);
	};

	return {
		getCookie,
		removeCookie,
		setCookie,
	};
};

export { useCookies };
