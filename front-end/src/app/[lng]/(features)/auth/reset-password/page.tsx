'use client';

import { Image } from '@component/ui/image';
import { Loading } from '@component/ui/loading';
import { useRequestResetPasswordMutate, useResetPasswordMutate } from '@hook/mutations/use-auth';
import { useSearchParams } from 'next/navigation';
import { EmailTab } from './_components/EmailTab';
import { NewPasswordTab } from './_components/NewPasswordTab';
import { ReactIcon } from '@component/ui/react-icon';
import { useTranslation } from '@hook/use-translation';
import { PageType } from '@type/page';

const ResetPasswordPage = ({ params: { lng } }: PageType) => {
	const params = useSearchParams();
	const activeTab = (params.get('tab') || 'new_password') as 'email' | 'new_password';
	const requestRestPasswordMutate = useRequestResetPasswordMutate();
	const resetPasswordMutate = useResetPasswordMutate();
	const { t } = useTranslation(lng);

	const tab = {
		email: <EmailTab requestResetPasswordMutate={requestRestPasswordMutate} />,
		new_password: <NewPasswordTab resetPasswordMutate={resetPasswordMutate} />,
	};

	return (
		<div
			className='border-round-3xl shadow-3 p-3 mx-auto flex max-w-full bg-white'
			style={{ width: 900, minHeight: 600 }}
		>
			<Loading show={requestRestPasswordMutate.isPending} />

			<div className='flex-1 sm:p-4 lg:p-6 sm:pr-6 lg:pr-7 flex flex-column gap-5'>
				<div className='flex align-items-center gap-2'>
					<ReactIcon
						icon='ai-fill-aliwangwang'
						size={40}
						color='var(--surface-600)'
					/>

					<p className='font-bold text-2xl flex-1'>{t('app:name')}</p>
				</div>

				<div className='h-full w-full flex flex-column align-items-center mt-4 gap-5'>
					{tab[activeTab] ? tab[activeTab] : tab['email']}
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

export default ResetPasswordPage;
