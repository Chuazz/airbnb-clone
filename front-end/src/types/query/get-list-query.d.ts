import { collectionConfig } from '@config/collection-config';
import { BaseQueryType } from './base-query';

type GetListType<ItemType> = BaseQueryType<ItemType> & {
	collection: keyof typeof collectionConfig;
};

export type { GetListType };
