import InputText from '@component/form/input-text';
import { ReactIcon } from '@component/ui/react-icon';
import { useTranslation } from '@hook/use-translation';
import { zodResolver } from '@hookform/resolvers/zod';
import { getResetPasswordSchema } from '@schema/auth';
import { UseMutationResult } from '@tanstack/react-query';
import { OptionType } from '@type/option';
import { PageParamType } from '@type/page';
import { useParams } from 'next/navigation';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const EmailTab = ({
	requestResetPasswordMutate,
}: {
	requestResetPasswordMutate: UseMutationResult<any, Error, string, unknown>;
}) => {
	const { lng } = useParams<PageParamType>();
	const { t } = useTranslation(lng);
	const [message, setMessage] = useState<OptionType>({
		code: '',
		label: '',
	});

	const { control, handleSubmit } = useForm({
		defaultValues: {
			email: '',
		},
		resolver: zodResolver(getResetPasswordSchema(t)),
	});

	const onSubmit = (data: { email: string }) => {
		requestResetPasswordMutate.mutate(data.email, {
			onSuccess() {
				setMessage({
					code: 'green',
					label: t('auth:check_account_exist', { email: data.email }),
				});
			},
			onError(error: any) {
				if (error.errors && Array.isArray(error.errors)) {
					setMessage({
						code: 'red',
						label: t(`request:${error.errors[0].extensions.code}`),
					});
				}
			},
		});
	};

	return (
		<>
			<div className='flex flex-column justify-content-center align-items-center gap-3'>
				<ReactIcon
					icon='fa-finger-print'
					size={40}
					color='var(--surface-600)'
				/>

				<p className='font-bold text-2xl'>{t('auth:forgot_password')}</p>

				<p className='text-500 text-sm font-semibold text-center'>{t('auth:send_reset_instruction')}</p>
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
								placeholder: t('auth:enter_your_email'),
								keyfilter: 'email',
								onChange: (name) => {
									setMessage({ code: '', label: '' });

									field.onChange(name);
								},
							}}
							label={{
								className: 'text-sm',
							}}
							errorMessage={fieldState.error?.message}
						/>
					)}
				/>

				{message.code && <p className={`text-${message.code}-500 mt-2 font-semibold text-sm`}>{message.label}</p>}

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

export { EmailTab };
