import { baseURL, resetPasswordCallBack } from '@config/routes';
import { AuthenticationData, createUser, passwordRequest, passwordReset, readItems, readUsers } from '@directus/sdk';
import { client } from '@root/src/libs/directus';
import { useMutation } from '@tanstack/react-query';
import { LoginType, RegisterType, ResetPasswordType } from '@type/auth';
import { PageParamType } from '@type/page';
import { useParams } from 'next/navigation';

const useLoginMutate = () => {
	return useMutation<AuthenticationData, Error, LoginType>({
		mutationFn: async (data) => {
			const response = await client.login(data.email, data.password);

			return response;
		},
	});
};

const useRegisterMutate = () => {
	return useMutation<any, Error, RegisterType>({
		mutationFn: async (data) => {
			const response = await client.request(
				createUser({
					email: data.email,
					first_name: data.firstName,
					last_name: data.lastName,
					password: data.password,
					role: process.env.NEXT_PUBLIC_DEFAULT_USER_ROLE_ID,
				}),
			);

			return response;
		},
	});
};

const useRequestResetPasswordMutate = () => {
	const { lng } = useParams<PageParamType>();

	return useMutation<any, Error, string>({
		mutationFn: async (email) => {
			// assign permission to use this
			// const data = await client.request(
			// 	readUsers({
			// 		filter: {
			// 			email: {
			// 				_eq: email,
			// 			},
			// 		},
			// 	}),
			// );

			// if (data.length === 0) {
			// 	throw new Error('no_record_found');
			// }

			const response = await client.request(passwordRequest(email, `${baseURL}${lng}${resetPasswordCallBack}`));

			return response;
		},
	});
};

const useResetPasswordMutate = () => {
	return useMutation<any, Error, ResetPasswordType>({
		mutationFn: async (data) => {
			const response = await client.request(passwordReset(data.token, data.password));

			return response;
		},
	});
};

export { useLoginMutate, useRegisterMutate, useRequestResetPasswordMutate, useResetPasswordMutate };
