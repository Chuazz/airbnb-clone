import { overlayConfig } from '@config/overlay-config';

type OpenOverlayType<OP = any> = {
	target: HTMLElement | EventTarget | null | undefined | SyntheticEvent<Element, Event> | null | undefined;
	name: keyof typeof overlayConfig;
	overlayProps?: OP;
};

type OverlayContextType = {
	open: (_data: OpenOverlayType) => void;
	close: () => void;
};

export type { OverlayContextType, OpenOverlayType };
