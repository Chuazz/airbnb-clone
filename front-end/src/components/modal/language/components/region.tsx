import { Loading } from '@component/ui/loading';
import { ReactIcon } from '@component/ui/react-icon';
import { Switch } from '@component/ui/switch';
import { supportLanguage } from '@config/i18n';
import { useGetList } from '@hook/use-get-list';
import { useTranslation } from '@hook/use-translation';
import { classNames } from 'primereact/utils';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from '@hook/use-router';
import { useSelector } from '@redux/store';
import { useModal } from '@hook/use-modal';
import { LanguagesCollectionType } from '@type/collection/languages-collection';

const Region = () => {
	const { t, lng } = useTranslation();
	const [value, setValue] = useState(false);
	const currentPage = useSelector((state) => state.app.page);
	const router = useRouter();
	const { close } = useModal();

	const languagesQuery = useGetList<LanguagesCollectionType>({
		t,
		collection: 'languages',
		query: {
			filter: {
				status: {
					_eq: 'published',
				},
			},
		},
	});

	return (
		<div className='gap-6 flex flex-column'>
			<Loading show={languagesQuery.isLoading} />

			<div className='flex align-items-center w-fit gap-4 surface-100 border-round p-3'>
				<div className='flex-1 flex flex-column gap-3'>
					<div className='flex align-items-center gap-2'>
						<p className='text-lg text-900'>{t('common:translation')}</p>

						<ReactIcon
							icon='bs-translate'
							size={20}
						/>
					</div>

					<p>
						{t('common:auto_translate_description_reviews_to', {
							language: supportLanguage[lng].translate,
						})}
					</p>
				</div>

				<Switch
					value={value}
					onChange={() => setValue(!value)}
				/>
			</div>

			<p className='text-2xl font-semibold text-900'>{t('common:choose_language_region')}</p>

			{languagesQuery.data && (
				<div className='grid align-items-center'>
					{languagesQuery.data.map((language) => (
						<div
							key={language.id}
							className='mx-2 col-2-5'
						>
							<motion.div
								initial={{
									background: '#fff',
									scale: 1,
								}}
								whileHover={{
									background: 'var(--surface-100)',
								}}
								whileTap={{
									scale: 0.95,
								}}
								className={classNames(
									'px-3 py-2 border-round border-500 flex flex-column gap-2 cursor-pointer',
									{
										'border-1': language.code === lng,
									},
								)}
								onClick={() => {
									close();

									if (language.code !== lng) {
										router.push(currentPage, language.code);
									}
								}}
							>
								<p className='text-900'>{language.sample}</p>

								<p>{language.name}</p>
							</motion.div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export { Region };
