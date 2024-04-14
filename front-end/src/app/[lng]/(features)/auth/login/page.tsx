'use client';

import InputPassword from '@component/form/input-password';
import InputText from '@component/form/input-text';
import { Image } from '@component/ui/image';
import Link from '@component/ui/link';
import { Loading } from '@component/ui/loading';
import { ReactIcon } from '@component/ui/react-icon';
import { Ripple } from '@component/ui/ripple';
import { useLoginMutate } from '@hook/mutations/use-auth';
import { useRouter } from '@hook/use-router';
import { useTranslation } from '@hook/use-translation';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@root/src/libs/request';
import { defaultLoginValues, getLoginSchema } from '@schema/auth';
import { LoginType } from '@type/auth';
import { PageType } from '@type/page';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ChangeLanguage } from './_components/change-language';
import { AbsoluteCenter, Box, Button, Center, Divider, Flex, Spacer, Stack, Text, VStack } from '@chakra-ui/react';

const LoginPage = ({ params: { lng } }: PageType) => {
	const { t } = useTranslation(lng);
	const { mutate, isPending } = useLoginMutate();
	const router = useRouter();

	const { control, handleSubmit } = useForm({
		defaultValues: defaultLoginValues,
		resolver: zodResolver(getLoginSchema(t)),
	});

	const onSubmit = async (data: LoginType) => {
		mutate(data, {
			onSuccess(data) {
				login(data);

				router.push('root');
			},
			onError(error: any) {
				if (error.errors && Array.isArray(error.errors)) {
					toast.error(t(`request:${error.errors[0].extensions.code}`));
				}
			},
		});
	};

	return (
		<Flex
			borderRadius='3xl'
			mx='auto'
			maxWidth='100%'
			backgroundColor='white'
			width='900px'
			overflow='hidden'
			p={6}
		>
			<Loading show={isPending} />

			<Flex
				flexDirection='column'
				flex={1}
				p={6}
				pr={12}
				gap={5}
			>
				<Flex
					alignItems='center'
					gap={2}
				>
					<ReactIcon
						icon='ai-fill-aliwangwang'
						size={40}
					/>

					<Text
						fontWeight='bold'
						fontSize='2xl'
					>
						{t('app:name')}
					</Text>

					<ChangeLanguage />
				</Flex>

				<Flex
					flexDirection='column'
					alignItems='center'
					gap={3}
					mt={4}
				>
					<ReactIcon
						icon='tb-door-enter'
						size={40}
						color='var(--surface-600)'
					/>

					<Text
						fontSize='xl'
						fontWeight='semibold'
					>
						{t('auth:welcome_back')}
					</Text>

					<p className='text-500 text-sm font-semibold text-center'>{t('auth:login_to_continue')}</p>
				</Flex>

				<div>
					<Flex
						flexDirection='column'
						gap={6}
					>
						<Controller
							name='email'
							control={control}
							render={({ field, fieldState }) => (
								<InputText
									input={{
										id: field.name,
										value: field.value,
										placeholder: t('common:email'),
										onChange: field.onChange,
										message: fieldState.error?.message,
									}}
								/>
							)}
						/>

						<Controller
							name='password'
							control={control}
							render={({ field, fieldState }) => (
								<InputText
									input={{
										type: 'password',
										value: field.value,
										placeholder: t('auth:password'),
										onChange: field.onChange,
										message: fieldState.error?.message,
									}}
								/>
							)}
						/>

						<Link
							href='reset-password'
							textAlign='right'
							fontSize='sm'
							color='gray.500'
							_hover={{
								textDecor: 'underline',
							}}
						>
							{t('auth:forgot_password')}
						</Link>

						<Button onClick={handleSubmit(onSubmit)}>{t('auth:login')}</Button>
					</Flex>

					<Box
						position='relative'
						my={10}
					>
						<Divider />

						<AbsoluteCenter bg='white'>
							<p className='text-sm text-600'>{t('common:or').toLowerCase()}</p>
						</AbsoluteCenter>
					</Box>

					<Center>
						<Link
							href='register'
							color='gray.500'
							width='40px'
							height='40px'
							border='1px'
							borderColor='gray.300'
							borderRadius='full'
						>
							<Center height='100%'>
								<ReactIcon
									icon='tb-user-plus'
									size={20}
								/>
							</Center>
						</Link>
					</Center>
				</div>
			</Flex>

			<Image
				alt=''
				src='auth-image'
				width={350}
				objectFit='cover'
				borderRadius='3xl'
			/>
		</Flex>
	);
};

export default LoginPage;
