import { overlayConfig } from '@config/overlay-config';

type OpenOverlayType<OP = any> = {
	name: keyof typeof overlayConfig;
	overlayProps?: OP;
};

type OverlayContextType = {
	open: (_data: OpenOverlayType) => void;
	close: () => void;
};

export type { OverlayContextType, OpenOverlayType };
