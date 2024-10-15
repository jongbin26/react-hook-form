import { useForm } from 'react-hook-form';

interface IFormInput {
	test: string;
	test2: string;
}

export default function Form4() {
	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: {
			errors,
			isDirty,
			isLoading,
			isSubmitted,
			isSubmitSuccessful,
			isSubmitting,
			isValid,
			submitCount,
			defaultValues,
			dirtyFields,
			touchedFields,
		},
	} = useForm<IFormInput>({
		mode: 'onChange',
		defaultValues: () => {
			return new Promise((resolve) => {
				setTimeout(() => resolve({ test: '', test2: '' }), 1000);
			});
		},
	});
	const onSubmit = (data: IFormInput) => {
		console.log(data);
		return new Promise((resolve) => {
			setTimeout(() => resolve(data), 1000);
		});
	};
	console.log(errors);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
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
				<input type="submit" />
				<p>errors.test.message: {errors.test?.message}</p>
				<p>errors.test2.message: {errors.test2?.message}</p>
				<p>isDirty: {isDirty.toString()}</p>
				<p>isLoading: {isLoading.toString()}</p>
				<p>isSubmitted: {isSubmitted.toString()}</p>
				<p>isSubmitSuccessful: {isSubmitSuccessful.toString()}</p>
				<p>isSubmitting: {isSubmitting.toString()}</p>
				<p>isValid: {isValid.toString()}</p>
				<p>submitCount: {submitCount}</p>
				<p>defaultValues: {JSON.stringify(defaultValues)}</p>
				<p>dirtyFields: {JSON.stringify(dirtyFields)}</p>
				<p>touchedFields: {JSON.stringify(touchedFields)}</p>
			</form>
			<button onClick={() => reset({ test: '', test2: '' })}>reset</button>
			<button
				onClick={() =>
					setError('test2', {
						type: 'manual',
						message: 'setError로 발생한 에러입니다.',
					})
				}
			>
				setError
			</button>
		</>
	);
}
