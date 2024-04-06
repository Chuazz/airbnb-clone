import { supportLanguage } from '@config/i18n';
import { route } from '@config/routes';
import { PageParamType } from '@type/page-type';
import { useRouter as useNextRouter, useParams } from 'next/navigation';

const useRouter = () => {
	const { lng } = useParams<PageParamType>();
	const router = useNextRouter();

	const push = (url: keyof typeof route, newLng?: keyof typeof supportLanguage) => {
		router.push(`/${newLng ? supportLanguage[newLng] : lng}${route[url]}`);
	};

	return {
		...router,
		push,
	};
};

export { useRouter };
