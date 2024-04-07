import { supportLanguage } from '@config/i18n';
import { PropsWithChildren } from 'react';

type PageParamType = {
	lng: keyof typeof supportLanguage;
};

type PageType = PropsWithChildren & {
	params: PageParamType;
	searchParams: {
		[key: string]: string;
	};
};

export type { PageType, PageParamType };
