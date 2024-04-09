import { Query } from '@directus/sdk';
import { UseQueryOptions } from '@tanstack/react-query';
import { TFunction } from 'i18next';

interface CustomUseQueryOptions extends Omit<UseQueryOptions, 'queryKey'> {}

type BaseQueryType<ItemType> = {
	query?: Query<any, ItemType>;
	useQueryOption?: CustomUseQueryOptions;
	t?: TFunction;
};

export type { BaseQueryType };
