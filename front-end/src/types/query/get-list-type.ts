import { collectionConfig } from '@config/collection-config';
import { Query } from '@directus/sdk';
import { QueryOptions } from '@tanstack/react-query';
import { TFunction } from 'i18next';

type GetListType<ItemType> = {
	collection: keyof typeof collectionConfig;
	t: TFunction;
	query?: Query<any, ItemType>;
	useQueryOption?: QueryOptions;
};

export type { GetListType };
