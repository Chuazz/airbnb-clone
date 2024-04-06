import { collectionConfig } from '@config/collection-config';
import { Query } from '@directus/sdk';
import { QueryOptions } from '@tanstack/react-query';
import { TFunction } from 'i18next';

type GetListType = {
	collection: keyof typeof collectionConfig;
	t: TFunction;
	query?: Query<any, (typeof collectionConfig)[keyof typeof collectionConfig]>;
	useQueryOption?: QueryOptions;
};

export type { GetListType };
