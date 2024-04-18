import { Button, Popover, PopoverContent, PopoverTrigger, useDisclosure } from '@chakra-ui/react';
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
	const { onClose, onOpen, onToggle, isOpen } = useDisclosure();

	return (
		<>
			<OverlayContext.Provider value={{ onClose, onOpen, onToggle, isOpen }}>
				<Popover
					isOpen={isOpen}
					onClose={onClose}
					onOpen={onOpen}
					isLazy={true}
					{...props.popoverProps}
				>
					<PopoverTrigger>
						<Button
							lineHeight='unset'
							height='auto'
							display='block'
							fontWeight='normal'
							padding={0}
							backgroundColor='transparent'
							_hover={{
								backgroundColor: 'transparent',
							}}
							{...props.buttonProps}
						>
							{children}
						</Button>
					</PopoverTrigger>

					<PopoverContent
						width='fit-content'
						borderRadius={0}
						backgroundColor='transparent'
						border='none'
						boxShadow='none'
						zIndex={1}
					>
						{content}
					</PopoverContent>
				</Popover>
			</OverlayContext.Provider>
		</>
	);
};
export { Overlay, OverlayContext };
