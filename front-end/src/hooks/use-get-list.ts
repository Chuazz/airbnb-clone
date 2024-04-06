import { queryKeyConfig } from '@config/queryKey-config';
import { readItems } from '@directus/sdk';
import { client } from '@lib/directus';
import { setToken } from '@lib/request';
import { useQuery } from '@tanstack/react-query';
import { GetListType } from '@type/query/get-list-type';

const useGetList = <ItemType = any>({ collection, query, useQueryOption, t }: GetListType<ItemType>) => {
	return useQuery<any, Error, ItemType[]>({
		...useQueryOption,
		refetchOnMount: false,
		refetchInterval: false,
		queryKey: queryKeyConfig[collection].list(query),
		queryFn: async () => {
			setToken();

			try {
				const response = await client.request(readItems(collection as any, query));

				return response;
			} catch (error: any) {
				if (error.errors && Array.isArray(error.errors)) {
					throw new Error(t(`request:${error.errors[0].extensions.code}`));
				}
			}
		},
	});
};

export { useGetList };
