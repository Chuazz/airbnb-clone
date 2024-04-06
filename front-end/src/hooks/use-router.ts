import { supportLanguage } from '@config/i18n';
import { route } from '@config/routes';
import { appSlice } from '@redux/slices/app-slice';
import { useDispatch } from '@redux/store';
import { PageParamType } from '@type/page-type';
import { useRouter as useNextRouter, useParams } from 'next/navigation';

const useRouter = () => {
	const { lng } = useParams<PageParamType>();
	const router = useNextRouter();
	const dispatch = useDispatch();

	const push = (path: keyof typeof route, newLng?: keyof typeof supportLanguage) => {
		dispatch(appSlice.actions.setPage(path));

		router.push(`/${newLng ? supportLanguage[newLng].code : lng}${route[path]}`);
	};

	return {
		...router,
		push,
	};
};

export { useRouter };
