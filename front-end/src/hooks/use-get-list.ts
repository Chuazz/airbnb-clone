import { getListAPI } from '@config/api/get-list-api';
import { queryKeyConfig } from '@config/queryKey-config';
import { http } from '@lib/request';
import { parseDirectusQuery } from '@lib/util';
import { useQuery } from '@tanstack/react-query';
import { GetListType } from '@type/query/get-list-query';

const useGetList = <ItemType = any>({ collection, query, useQueryOption, t }: GetListType<ItemType>) => {
	return useQuery<any, Error, ItemType[]>({
		...useQueryOption,
		refetchOnWindowFocus: false,
		queryKey: queryKeyConfig[collection].list(query),
		select(data) {
			return data?.data;
		},
		queryFn: async () => {
			try {
				const response = await http.get(getListAPI[collection] + '?' + parseDirectusQuery(query));

				return response.data;
			} catch (error: any) {
				if (error.errors && Array.isArray(error.errors)) {
					throw new Error(t?.(`request:${error.errors[0].extensions.code}`));
				}
			}
		},
	});
};

export { useGetList };
