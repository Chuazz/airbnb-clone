import ErrorMessage from '@component/ui/error-message';
import classNames from 'classnames';
import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';

type TextEditorProps = {
	container?: React.HTMLAttributes<HTMLDivElement>;
	label?: React.HtmlHTMLAttributes<HTMLLabelElement>;
	input?: {
		id: number;
		label?: string;
		value?: string;
		onChange?: (_value: string) => void;
		config?: EditorConfig;
	};
	errorMessage?: string;
};

const TextEditor = (props: TextEditorProps) => {
	return (
		<div
			{...props.container}
			className={classNames('w-full', props.container?.className)}
		>
			{props.input?.label && (
				<label
					{...props.label}
					className={classNames({ 'p-error': props?.errorMessage }, props.label?.className)}
				>
					{props.input?.label}
				</label>
			)}

			<CKEditor
				editor={Editor}
				id={props.input?.id}
				config={props.input?.config}
				data={props?.input?.value}
				onChange={(event, editor) => {
					props.input?.onChange?.(editor.getData());
				}}
			/>

			<ErrorMessage
				message={props.errorMessage}
				className='pl-2 mt-1'
			/>
		</div>
	);
};

export default TextEditor;
