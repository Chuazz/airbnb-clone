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
import { LoginType } from '@type/auth-type';
import { PageType } from '@type/page-type';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ChangeLanguage } from './_components/ChangeLanguage';

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
		<div
			className='border-round-3xl shadow-3 p-3 mx-auto flex max-w-full bg-white'
			style={{ width: 900, minHeight: 600 }}
		>
			<Loading show={isPending} />

			<div className='flex-1 sm:p-4 lg:p-6 sm:pr-6 lg:pr-7 sm:pt-3 lg:pt-3 flex flex-column gap-5'>
				<div className='flex align-items-center gap-2'>
					<ReactIcon
						icon='ai-fill-aliwangwang'
						size={40}
					/>

					<p className='font-bold text-2xl flex-1'>{t('app:name')}</p>

					<ChangeLanguage />
				</div>

				<div className='flex flex-column align-items-center gap-3 mt-4'>
					<ReactIcon
						icon='tb-door-enter'
						size={40}
						color='var(--surface-600)'
					/>

					<p className='text-xl font-bold'>{t('auth:welcome_back')}</p>

					<p className='text-500 text-sm font-semibold text-center'>{t('auth:login_to_continue')}</p>
				</div>

				<div>
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
										keyfilter: 'email',
										onChange: field.onChange,
									}}
									errorMessage={fieldState.error?.message}
								/>
							)}
						/>

						<Controller
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
						/>

						<Link
							href='reset-password'
							className='text-sm text-400 text-right hover:text-primary hover:underline'
						>
							{t('auth:forgot_password')}
						</Link>

						<Button
							label={t('auth:login')}
							size='small'
							rounded={true}
							className=' w-full'
							onClick={handleSubmit(onSubmit)}
						/>
					</div>

					<Divider align='center'>
						<p className='text-sm text-600'>{t('common:or').toLowerCase()}</p>
					</Divider>

					<div className='flex align-items-center justify-content-center gap-2'>
						<Link
							href='register'
							className='text-500'
						>
							<Ripple
								className='border-circle border-1 border-solid border-300 flex align-items-center justify-content-center'
								style={{
									width: 40,
									height: 40,
								}}
							>
								<ReactIcon
									icon='tb-user-plus'
									size={20}
								/>
							</Ripple>
						</Link>

						{/* <Ripple className='border-circle border-1 border-solid border-300 w-2rem h-2rem flex align-items-center justify-content-center'>
							<ReactIcon
								icon='fc-google'
								size={18}
							/>
						</Ripple> */}
					</div>
				</div>
			</div>

			<Image
				alt=''
				src='auth-image'
				width='350'
				className='ngo van son'
				imageClassName='border-round-3xl h-full'
				imageStyle={{ objectFit: 'cover' }}
			/>
		</div>
	);
};

export default LoginPage;
