import { overlayConfig } from '@config/overlay-config';

type OverlaySliceType = {
	active?: keyof typeof overlayConfig;
};

export type { OverlaySliceType };
