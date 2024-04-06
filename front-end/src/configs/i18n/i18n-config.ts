import { OptionType } from '@type/option-type';

const FALLBACK_LNG = 'en';
const LANGUAGES = [FALLBACK_LNG, 'vi'];
const DEFAULT_NS = 'common';

const supportLanguage = {
	vi: 'vi',
	en: 'en',
};

const supportLanguages: OptionType[] = [
	{
		code: supportLanguage.vi,
		label: 'Việt Nam',
	},
	{
		code: supportLanguage.en,
		label: 'English',
	},
];

export { FALLBACK_LNG, LANGUAGES, DEFAULT_NS, supportLanguages, supportLanguage };
