import { Flex, Grid, Text, VStack } from '@chakra-ui/react';
import { Loading } from '@component/ui/loading';
import { ReactIcon } from '@component/ui/react-icon';
import { Switch } from '@component/ui/switch';
import { supportLanguage } from '@config/i18n';
import { useGetList } from '@hook/use-get-list';
import { useRouter } from '@hook/use-router';
import { useTranslation } from '@hook/use-translation';
import { useSelector } from '@redux/store';
import { LanguagesCollectionType } from '@type/collection/languages-collection';
import { useState } from 'react';

const Region = () => {
	const { t, lng } = useTranslation();
	const [value, setValue] = useState(false);
	const currentPage = useSelector((state) => state.app.page);
	const router = useRouter();

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
		<Flex
			gap={6}
			flexDirection='column'
		>
			<Loading show={languagesQuery.isLoading} />

			<Flex
				backgroundColor='gray.50'
				gap={4}
				borderRadius='md'
				alignItems='center'
				width='fit-content'
				p={4}
			>
				<VStack
					align='start'
					flex={1}
				>
					<Flex
						alignItems='center'
						gap={2}
					>
						<Text>{t('common:translation')}</Text>

						<ReactIcon
							icon='bs-translate'
							boxSize={5}
						/>
					</Flex>

					<Text
						color='gray.500'
						fontSize='sm'
					>
						{t('common:auto_translate_description_reviews_to', {
							language: supportLanguage[lng].translate,
						})}
					</Text>
				</VStack>

				<Switch
					value={value}
					onChange={() => setValue(!value)}
				/>
			</Flex>

			<Text
				fontWeight='semibold'
				fontSize='xl'
			>
				{t('common:choose_language_region')}
			</Text>

			{languagesQuery.data && (
				<Grid
					templateColumns='repeat(5, 1fr)'
					gap={4}
				>
					{languagesQuery.data.map((language) => (
						<VStack
							key={language.id}
							border='1px'
							borderColor={language.code === lng ? 'gray.800' : 'transparent'}
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

								if (language.code !== lng) {
									router.push(currentPage, language.code);
								}
							}}
						>
							<Text>{language.sample}</Text>

							<Text
								fontSize='sm'
								color='gray.500'
							>
								{language.name}
							</Text>
						</VStack>
					))}
				</Grid>
			)}
		</Flex>
	);
};

export { Region };
