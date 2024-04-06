import { defineHook } from '@directus/extensions-sdk';
import { randomUUID } from 'crypto';
import type { ActionHandler } from '@directus/types/dist/events';

const updateImageFolder: ActionHandler = async (e, meta) => {
	console.log(e);

	if (e.payload.image) {
		const key = e.keys[0];
		const imageKey = e.payload.image;

		const imageQuery = meta.database.table('directus_files').where('id', imageKey).first();
		const folderQuery = meta.database.table('directus_folders').where('name', key);

		const image = await imageQuery;
		const count = (await folderQuery).length;

		if (count === 0) {
			const id = randomUUID();

			await meta.database.table('directus_folders').insert({
				id,
				name: key,
				parent: image.folder,
			});

			await imageQuery.update({
				folder: id,
			});
		} else {
			const folder = await folderQuery.first();

			await imageQuery.update({
				folder: folder.id,
			});
		}
	}
};

export default defineHook(({ action }) => {
	action('products.items.update', updateImageFolder);

	action('product_categories.items.update', updateImageFolder);

	action('directus_users.items.update', updateImageFolder);
});
