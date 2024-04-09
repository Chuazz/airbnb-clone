import { customApi } from '@config/api/custom-api';
import { queryKeyConfig } from '@config/queryKey-config';
import { http } from '@lib/request';
import { useQuery } from '@tanstack/react-query';
import { UsersCollection } from '@type/collection/users-collection';
import { BaseQueryType } from '@type/query/base-query';

const useGetMyProfile = (props?: BaseQueryType<UsersCollection>) => {
	const { useQueryOption } = props || {};

	return useQuery<any, Error, UsersCollection>({
		...useQueryOption,
		queryKey: queryKeyConfig.users.me,
		refetchOnWindowFocus: false,
		select(data) {
			return data?.data;
		},
		queryFn: async () => {
			const result = await http.get(customApi.me);

			return result.data;
		},
	});
};

export { useGetMyProfile };
