import { route } from '@config/routes';

type AppSliceType = {
	page: keyof typeof route;
};

export type { AppSliceType };
