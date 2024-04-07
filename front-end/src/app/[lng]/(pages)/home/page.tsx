'use client';

import { request } from '@root/src/libs/request';
import { PageType } from '@type/page';
import { Button } from 'primereact/button';

const HomePage = ({ params: { lng } }: PageType) => {
	return (
		<div className='w-screen h-screen flex flex-column gap-3 align-items-center justify-content-center'>
			Welcome to Home Page
			<Button
				label='refresh token here'
				onClick={() => {
					request.get('https://jsonplaceholder.typicode.com/todos');
				}}
			/>
		</div>
	);
};

export default HomePage;
