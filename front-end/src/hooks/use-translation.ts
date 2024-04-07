import { DEFAULT_NS, FALLBACK_LNG, supportLanguage } from '@config/i18n';
import { PageParamType } from '@type/page';
import { createInstance } from 'i18next';
import { useParams } from 'next/navigation';
import { initReactI18next } from 'react-i18next/initReactI18next';

const useTranslation = (language?: keyof typeof supportLanguage, options: any = {}) => {
	const i18nextInstance = createInstance();
	const { lng } = useParams<PageParamType>();

	i18nextInstance.use(initReactI18next).init({
		lng: language || lng,
		ns: DEFAULT_NS,
		resources: {
			en: {
				common: require('@config/i18n/locales/en/common.json'),
				app: require('@config/i18n/locales/en/app.json'),
				auth: require('@config/i18n/locales/en/auth.json'),
				menu: require('@config/i18n/locales/en/menu.json'),
				request: require('@config/i18n/locales/en/request.json'),
				validation: require('@config/i18n/locales/en/validation.json'),
			},
			vi: {
				common: require('@config/i18n/locales/vi/common.json'),
				app: require('@config/i18n/locales/vi/app.json'),
				auth: require('@config/i18n/locales/vi/auth.json'),
				menu: require('@config/i18n/locales/vi/menu.json'),
				request: require('@config/i18n/locales/vi/request.json'),
				validation: require('@config/i18n/locales/vi/validation.json'),
			},
		},
		defaultNS: DEFAULT_NS,
		fallbackLng: FALLBACK_LNG,
	});

	return {
		t: i18nextInstance.getFixedT(language || lng, DEFAULT_NS, options.keyPrefix),
		i18n: i18nextInstance,
		lng,
	};
};

export { useTranslation };
