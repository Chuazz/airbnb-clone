import { supportLanguage } from '@config/i18n';
import { BaseCollectionType } from './base-collection';

type LanguagesCollectionType = BaseCollectionType & {
	name: string;
	code: keyof typeof supportLanguage;
	sample: string;
};

export type { LanguagesCollectionType };
