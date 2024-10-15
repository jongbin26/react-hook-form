import { useForm } from 'react-hook-form';

interface IFormInput {
	test: string;
	test2: string;
}

export default function Form3() {
	const {
		register,
		setValue,
		formState: { errors, isValid, isDirty, touchedFields },
	} = useForm<IFormInput>({
		mode: 'onChange',
		defaultValues: { test: '123', test2: 'testtest' },
	});

	return (
		<>
			<form>
				<input
					{...register('test', {
						maxLength: { value: 5, message: '최대 5자' },
						deps: 'test2',
					})}
				/>
				<input
					{...register('test2', {
						maxLength: { value: 5, message: '최대 5자' },
					})}
				/>
				<p>isValid: {isValid.toString()}</p>
				<p>errors.test.message: {errors.test?.message}</p>
				<p>errors.test2.message: {errors.test2?.message}</p>
				<p>isDirty: {isDirty.toString()}</p>
				<p>shouldTouch: {touchedFields.test?.toString()}</p>
			</form>
			<div>
				<button
					onClick={() => setValue('test', '123456', { shouldValidate: true })}
				>
					setValue shouldValidate
				</button>
				<button onClick={() => setValue('test', '1234', { shouldDirty: true })}>
					setValue shouldDirty
				</button>
				<button onClick={() => setValue('test', '12', { shouldTouch: true })}>
					setValue shouldTouch
				</button>
			</div>
		</>
	);
}
