import { Popover, PopoverContent, PopoverTrigger, useDisclosure } from '@chakra-ui/react';
import { OverlayContextType } from '@type/context/overlay-context';
import { OverlayType } from '@type/overlay/overlay';
import { createContext } from 'react';

const OverlayContext = createContext<OverlayContextType>({
	isOpen: false,
	onClose() {},
	onToggle() {},
	onOpen() {},
});

const Overlay = ({ children, content, ...props }: OverlayType) => {
	const { isOpen, onToggle, onClose, onOpen } = useDisclosure();

	return (
		<OverlayContext.Provider value={{ isOpen, onToggle, onClose, onOpen }}>
			<Popover
				{...props}
				isOpen={isOpen}
				onClose={onClose}
				onOpen={onOpen}
				isLazy={true}
			>
				<PopoverTrigger>
					<button onClick={onToggle}>{children}</button>
				</PopoverTrigger>

				<PopoverContent
					width='fit-content'
					overflow='hidden'
				>
					{content}
				</PopoverContent>
			</Popover>
		</OverlayContext.Provider>
	);
};
export { Overlay, OverlayContext };
