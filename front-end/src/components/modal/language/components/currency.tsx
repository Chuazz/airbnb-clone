import { Flex, Grid, Text, VStack } from '@chakra-ui/react';
import { Loading } from '@component/ui/loading';
import { useGetList } from '@hook/use-get-list';
import { useModal } from '@hook/use-modal';
import { useRouter } from '@hook/use-router';
import { useTranslation } from '@hook/use-translation';
import { useSelector } from '@redux/store';
import { CurrenciesCollectionType } from '@type/collection/currencies-collection';

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
		<Flex
			flexDirection='column'
			gap={6}
		>
			<Loading show={currenciesQuery.isLoading} />

			<Text
				fontWeight='semibold'
				fontSize='xl'
			>
				{t('common:choose_currency')}
			</Text>

			{currenciesQuery.data && (
				<Grid
					templateColumns='repeat(5, 1fr)'
					gap={4}
				>
					{currenciesQuery.data.map((currency) => (
						<VStack
							key={currency.id}
							border='1px'
							borderColor={currency.code === lng ? 'gray.800' : 'transparent'}
							px={3}
							py={2}
							borderRadius='lg'
							cursor='pointer'
							spacing={0}
							align='flex-start'
							_hover={{
								backgroundColor: 'var(--chakra-colors-gray-50)',
							}}
							onClick={() => {
								close();

								if (currency.code !== lng) {
									router.push(currentPage, currency.code);
								}
							}}
						>
							<Text>{currency.name}</Text>

							<Text
								fontSize='sm'
								color='gray.500'
							>
								{currency.symbol}
							</Text>
						</VStack>
					))}
				</Grid>
			)}
		</Flex>
	);
};

export { Currency };
