import { Flex, Text, VStack } from '@chakra-ui/react';
import { searchBarSlice } from '@redux/slices/search-bar-slice';
import { useDispatch, useSelector } from '@redux/store';
import { HeaderChildrenTabType } from '@type/common';
import { OptionType } from '@type/option';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { ComponentPropsWithRef, forwardRef } from 'react';
import styles from './tab-item.module.scss';

const ChildrenTabItem = forwardRef<
	HTMLDivElement,
	{ tab: OptionType<HeaderChildrenTabType> } & ComponentPropsWithRef<'div'>
>(({ tab, ...prop }, ref) => {
	const searching = useSelector((state) => state.searchBar.searching);
	const childrenActiveTab = useSelector((state) => state.searchBar.childrenActive);
	const dispatch = useDispatch();

	return (
		<div
			ref={ref}
			style={tab.styles}
			{...prop}
		>
			<Flex
				as={motion.div}
				boxShadow={tab.code === childrenActiveTab ? 'header' : 'none'}
				alignItems='center'
				justifyContent='space-between'
				cursor='pointer'
				borderRadius={9999}
				position='relative'
				py={2}
				border='1px'
				borderLeft='none'
				borderRight='none'
				borderColor={tab.code === childrenActiveTab ? 'gray.200' : 'transparent'}
				backgroundColor={tab.code === childrenActiveTab ? 'white' : 'transparent'}
				zIndex={tab.code === childrenActiveTab ? 1 : 0}
				className={classNames(styles[`container-${searching}`], styles['container'], tab.className, {
					[styles['active']]: tab.code === childrenActiveTab,
				})}
				onClick={() => {
					dispatch(searchBarSlice.actions.setChildrenActive(tab.code));
					dispatch(searchBarSlice.actions.setSearching(true));

					tab.action?.();
				}}
			>
				<VStack
					px={5}
					spacing={0}
					align='flex-start'
					className={tab.className}
				>
					<Text
						fontSize='small'
						fontWeight='500'
						color='gray.800'
					>
						{tab.label}
					</Text>

					<Text color='gray.600'>{tab.subLabel}</Text>
				</VStack>

				{tab.divide && (
					<div className={classNames(styles[`container-border-${searching}`], styles['container-border'])} />
				)}
			</Flex>
		</div>
	);
});

ChildrenTabItem.displayName = 'ChildrenTabItem';

export { ChildrenTabItem };
