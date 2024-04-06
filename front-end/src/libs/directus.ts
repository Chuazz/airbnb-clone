import { authentication, createDirectus, rest } from '@directus/sdk';

const client = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_PROJECT_URL).with(authentication('json')).with(rest());

export { client };
