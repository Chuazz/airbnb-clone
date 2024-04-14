import { searchBarSlice } from '@redux/slices/search-bar-slice';
import { useDispatch, useSelector } from '@redux/store';
import { HeaderChildrenTabType } from '@type/common';
import { OptionType } from '@type/option';
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from './tab-item.module.scss';
import { Box, Text } from '@chakra-ui/react';

const ChildrenTabItem = ({
	tab,
	children,
}: {
	tab: OptionType<HeaderChildrenTabType>;
} & PropsWithChildren) => {
	const searching = useSelector((state) => state.searchBar.searching);
	const childrenActiveTab = useSelector((state) => state.searchBar.childrenActive);
	const dispatch = useDispatch();

	return (
		<div style={tab.styles}>
			<Box
				as={motion.div}
				boxShadow={tab.code === childrenActiveTab ? 'header' : 'none'}
				display='flex'
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
				<Box
					px={5}
					display='flex'
					flexDirection='column'
					width='100%'
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
				</Box>

				{children}

				{tab.divide && (
					<div className={classNames(styles[`container-border-${searching}`], styles['container-border'])} />
				)}
			</Box>
		</div>
	);
};

export { ChildrenTabItem };
