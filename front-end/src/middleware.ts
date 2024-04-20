import { cookieConfig } from '@config/cookie-config';
import { FALLBACK_LNG, LANGUAGES } from '@config/i18n';
import { DEFAULT_LOGIN_REDIRECT, authRoute, authRoutes, pubicRoutes } from '@config/routes';
import acceptLanguage from 'accept-language';
import { differenceInDays } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

acceptLanguage.languages(LANGUAGES);

const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

const middleware = (req: NextRequest, _res: NextResponse) => {
	let lng: string | null = FALLBACK_LNG;

	const { nextUrl } = req;
	const isPublicRoute = !!pubicRoutes.find((route) => nextUrl.pathname.endsWith(route));
	const isAuthRoute = !!authRoutes.find((route) => nextUrl.pathname.endsWith(route));

	const isLogIn = differenceInDays(parseInt(req.cookies.get(cookieConfig.expires_at)?.value!), new Date()) > 0;

	if (req.cookies.has(cookieConfig.i18n)) {
		lng = acceptLanguage.get(req.cookies.get(cookieConfig.i18n)?.value);
	}

	if (!lng) {
		lng = acceptLanguage.get(req.headers.get('Accept-Language'));
	}

	if (isAuthRoute) {
		if (isLogIn) {
			return NextResponse.redirect(new URL(`/${lng}${DEFAULT_LOGIN_REDIRECT}`, nextUrl));
		}
	}

	if (!isLogIn && isPublicRoute) {
		return NextResponse.redirect(new URL(`/${lng}${authRoute.login}`, nextUrl));
	}

	if (req.headers.has('referer')) {
		const refererUrl = new URL(req.headers.get('referer') || '');
		const lngInReferer = LANGUAGES.find((l) => refererUrl.pathname.startsWith(`/${l}`));
		const response = NextResponse.next();

		if (lngInReferer) {
			response.cookies.set(cookieConfig.i18n, lngInReferer);
		}

		return response;
	}

	return;
};

export default middleware;
export { config };
