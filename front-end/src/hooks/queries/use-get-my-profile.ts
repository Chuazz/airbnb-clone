import { apiConfig } from '@config/api-config';
import { queryKeyConfig } from '@config/queryKey-config';
import { http } from '@lib/request';
import { useQuery } from '@tanstack/react-query';
import { UsersCollection } from '@type/collection/users-collection';

const useGetMyProfile = () => {
	return useQuery<any, Error, UsersCollection>({
		queryKey: queryKeyConfig.users.me,
		select(data) {
			return data?.data;
		},
		queryFn: async () => {
			const result = await http.get(apiConfig.me);

			return result.data;
		},
	});
};

export { useGetMyProfile };
