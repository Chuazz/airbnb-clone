'use client';

import { Button } from '@chakra-ui/react';
import InputText from '@component/form/input-text';
import { Image } from '@component/ui/image';
import { Loading } from '@component/ui/loading';
import { ReactIcon } from '@component/ui/react-icon';
import { useRegisterMutate } from '@hook/mutations/use-auth';
import { useRouter } from '@hook/use-router';
import { useTranslation } from '@hook/use-translation';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultRegisterValues, getRegisterSchema } from '@schema/auth';
import { RegisterType } from '@type/auth';
import { PageType } from '@type/page';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const RegisterPage = ({ params: { lng } }: PageType) => {
	const { t } = useTranslation(lng);
	const { isPending, mutate } = useRegisterMutate();
	const router = useRouter();

	const { control, handleSubmit } = useForm({
		defaultValues: defaultRegisterValues,
		resolver: zodResolver(getRegisterSchema(t)),
	});

	const onSubmit = (data: RegisterType) => {
		mutate(data, {
			onSuccess() {
				toast.success(t('auth:register_success'));

				router.push('login');
			},
			onError(error: any) {
				if (error.errors && Array.isArray(error.errors)) {
					toast.error(t(`request:${error.errors[0].extensions.code}`));
				}
			},
		});
	};

	return (
		<div
			className='border-round-3xl shadow-3 p-3 mx-auto flex max-w-full bg-white'
			style={{ width: 900, minHeight: 600 }}
		>
			<Loading show={isPending} />

			<div className='flex-1 sm:p-4 lg:p-6 sm:pr-6 lg:pr-7 flex flex-column gap-5'>
				<div className='flex align-items-center gap-2'>
					<ReactIcon
						icon='ai-fill-aliwangwang'
						size={40}
					/>

					<p className='font-bold text-2xl flex-1'>{t('app:name')}</p>
				</div>

				<div className='flex flex-column justify-content-center align-items-center gap-3 mt-4'>
					<ReactIcon
						icon='bs-envelope-arrow-up-fill'
						size={40}
					/>

					<p className='font-bold text-2xl'>{t('auth:register')}</p>

					<p className='text-500 text-sm font-semibold'>{t('auth:enter_your_detail')}</p>
				</div>

				<div className='w-full flex flex-column gap-3'>
					<Controller
						name='email'
						control={control}
						render={({ field, fieldState }) => (
							<InputText
								input={{
									id: field.name,
									value: field.value,
									placeholder: t('common:email'),
									helpText: t('auth:use_in_case_forgot_password'),
									keyfilter: 'email',
									onChange: field.onChange,
								}}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>

					<Controller
						name='firstName'
						control={control}
						render={({ field, fieldState }) => (
							<InputText
								input={{
									id: field.name,
									value: field.value,
									placeholder: t('common:first_name'),
									onChange: field.onChange,
								}}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>

					<Controller
						name='lastName'
						control={control}
						render={({ field, fieldState }) => (
							<InputText
								input={{
									id: field.name,
									value: field.value,
									placeholder: t('common:last_name'),
									onChange: field.onChange,
								}}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>

					{/* <Controller
						name='password'
						control={control}
						render={({ field, fieldState }) => (
							<InputPassword
								input={{
									value: field.value,
									placeholder: t('auth:password'),
									toggleMask: true,
									feedback: false,
									onChange: field.onChange,
								}}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/> */}

					<Controller
						name='confirmPassword'
						control={control}
						render={({ field, fieldState }) => (
							<InputPassword
								input={{
									value: field.value,
									placeholder: t('auth:confirm_password'),
									toggleMask: true,
									feedback: false,
									onChange: field.onChange,
								}}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>

					<Button
						size='small'
						className='w-full'
						onClick={handleSubmit(onSubmit)}
					>
						{t('auth:create_account')}
					</Button>

					{/* <Divider align='center'>
						<p className='text-sm text-600'>{t('common:or').toLowerCase()}</p>
					</Divider>

					<div className='flex align-items-center justify-content-center gap-2'>
						<Ripple className='border-circle border-1 border-solid border-200 w-2rem h-2rem flex align-items-center justify-content-center'>
							<FcGoogle size={18} />
						</Ripple>
					</div> */}
				</div>
			</div>

			<Image
				alt=''
				src='auth-image'
				width='350'
				imageClassName='border-round-3xl h-full'
				imageStyle={{ objectFit: 'cover' }}
			/>
		</div>
	);
};

export default RegisterPage;
