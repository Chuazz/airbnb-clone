import { CurrenciesCollectionType } from '@type/collection/currencies-collection';
import { LanguagesCollectionType } from '@type/collection/languages-collection';
import { UsersCollection } from '@type/collection/users-collection';

const collectionConfig = {
	languages: {} as LanguagesCollectionType,
	currencies: {} as CurrenciesCollectionType,
	users: {} as UsersCollection,
};

export { collectionConfig };
