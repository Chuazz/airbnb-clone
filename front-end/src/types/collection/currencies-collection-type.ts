import { supportLanguage } from '@config/i18n';
import { BaseCollectionType } from './base-collection-type';

type CurrenciesCollectionType = BaseCollectionType & {
	name: string;
	code: keyof typeof supportLanguage;
	symbol: string;
};

export type { CurrenciesCollectionType };
