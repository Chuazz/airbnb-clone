import { useRouter } from '@hook/use-router';
import { PageParamType } from '@type/page';
import { useParams } from 'next/navigation';

const ChangeLanguage = () => {
	const { lng } = useParams<PageParamType>();
	const router = useRouter();

	// const Selected = (option: OptionType, props: DropdownProps) => {
	// 	if (option) {
	// 		const country = option.code as keyof typeof supportLanguage;

	// 		return (
	// 			<div className='flex align-items-center gap-1'>
	// 				<Image
	// 					alt=''
	// 					src={`${country}-flag-icon`}
	// 					width='20'
	// 				/>
	// 				<p>{option.label}</p>
	// 			</div>
	// 		);
	// 	}

	// 	return <span>{props.placeholder}</span>;
	// };

	// const Item = (option: OptionType) => {
	// 	const country = option.code as keyof typeof supportLanguage;

	// 	return (
	// 		<div className='flex align-items-center gap-1 p-0'>
	// 			<Image
	// 				alt=''
	// 				src={`${country}-flag-icon`}
	// 				width='20'
	// 			/>
	// 			<p>{option.label}</p>
	// 		</div>
	// 	);
	// };

	return (
		// <Dropdown
		// 	value={lng}
		// 	optionLabel='label'
		// 	optionValue='code'
		// 	options={supportLanguages}
		// 	valueTemplate={Selected}
		// 	itemTemplate={Item}
		// 	className='border-rounded'
		// 	onChange={(event) => {
		// 		router.push('login', event.value);
		// 	}}
		// />
		null
	);
};

export { ChangeLanguage };
