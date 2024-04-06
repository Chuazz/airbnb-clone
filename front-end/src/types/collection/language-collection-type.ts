import { supportLanguage } from '@config/i18n';

type LanguageCollectionType = {
	id: string;
	name: string;
	code: keyof typeof supportLanguage;
	sample: string;
};

export type { LanguageCollectionType };
