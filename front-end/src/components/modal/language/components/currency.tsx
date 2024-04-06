import { Loading } from '@component/ui/loading';
import { useGetList } from '@hook/use-get-list';
import { useModal } from '@hook/use-modal';
import { useRouter } from '@hook/use-router';
import { useTranslation } from '@hook/use-translation';
import { useSelector } from '@redux/store';
import { CurrenciesCollectionType } from '@type/collection/currencies-collection-type';
import { motion } from 'framer-motion';
import { classNames } from 'primereact/utils';

const Currency = () => {
	const { t, lng } = useTranslation();
	const currentPage = useSelector((state) => state.app.page);
	const router = useRouter();
	const { close } = useModal();

	const currenciesQuery = useGetList<CurrenciesCollectionType>({
		t,
		collection: 'currencies',
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
			<Loading show={currenciesQuery.isLoading} />

			<p className='text-2xl font-semibold text-900'>{t('common:choose_currency')}</p>

			{currenciesQuery.data && (
				<div className='grid align-items-center'>
					{currenciesQuery.data.map((currency) => (
						<div
							key={currency.id}
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
										'border-1': currency.code === lng,
									},
								)}
								onClick={() => {
									close();

									if (currency.code !== lng) {
										router.push(currentPage, currency.code);
									}
								}}
							>
								<p className='text-900'>{currency.name}</p>

								<p>{currency.symbol}</p>
							</motion.div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export { Currency };
