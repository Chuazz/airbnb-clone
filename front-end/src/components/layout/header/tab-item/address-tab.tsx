import { OptionType } from '@type/option';
import { ChildrenTabItem } from './children-tab-item';
import { HeaderChildrenTabType } from '@type/common';
import { Overlay } from '@component/overlay';
import { AddressOverlay } from '../overlay/address-overlay';

const AddressTab = (data: OptionType<HeaderChildrenTabType>) => {
	return (
		<Overlay
			content={<AddressOverlay />}
			buttonProps={{
				style: data.styles,
			}}
			popoverProps={{
				placement: 'bottom-start',
			}}
		>
			<ChildrenTabItem
				tab={{
					...data,
					styles: {
						paddingRight: 0,
					},
				}}
			/>
		</Overlay>
	);
};

export { AddressTab };
