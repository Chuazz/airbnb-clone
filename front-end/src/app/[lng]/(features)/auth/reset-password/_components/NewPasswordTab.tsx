import InputPassword from '@component/form/input-password';
import { ReactIcon } from '@component/ui/react-icon';
import { useRouter } from '@hook/use-router';
import { useTranslation } from '@hook/use-translation';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultResetPasswordValues, getNewPasswordSchema } from '@schema/auth';
import { UseMutationResult } from '@tanstack/react-query';
import { ResetPasswordType } from '@type/auth-type';
import { PageParamType } from '@type/page-type';
import { useParams, useSearchParams } from 'next/navigation';
import { Button } from 'primereact/button';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const NewPasswordTab = ({
	resetPasswordMutate,
}: {
	resetPasswordMutate: UseMutationResult<any, Error, ResetPasswordType, unknown>;
}) => {
	const { lng } = useParams<PageParamType>();
	const { t } = useTranslation(lng);
	const { push } = useRouter();
	const { get } = useSearchParams();

	const { control, handleSubmit } = useForm({
		defaultValues: defaultResetPasswordValues,
		resolver: zodResolver(getNewPasswordSchema(t)),
	});

	const onSubmit = (data: ResetPasswordType) => {
		if (get('token')) {
			data.token = get('token')!;

			resetPasswordMutate.mutate(data, {
				onSuccess() {
					toast.success(t('auth:your_password_has_been_successfully_updated'));

					push('login');
				},
				onError(error: any) {
					if (error.errors && Array.isArray(error.errors)) {
						toast.error(t(`request:${error.errors[0].extensions.code}`));
					}
				},
			});
		}
	};

	return (
		<>
			<div className='flex flex-column justify-content-center align-items-center gap-3'>
				<ReactIcon
					icon='tb-finger-print-scan'
					size={60}
					color='var(--surface-600)'
				/>

				<p className='font-bold text-2xl'>{t('auth:just_one_more_step')}</p>

				<p className='text-500 font-semibold text-center text-sm'>{t('auth:everything_is_almost_done')}</p>
			</div>

			<div className='w-full flex flex-column gap-3'>
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

				<Controller
					name='confirmPassword'
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

				<Button
					label={t('auth:reset_password')}
					size='small'
					rounded={true}
					className='w-full'
					onClick={handleSubmit(onSubmit)}
				/>
			</div>
		</>
	);
};

export { NewPasswordTab };
