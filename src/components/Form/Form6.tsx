import { useForm, Control, useFormState } from 'react-hook-form';

type FormValue = {
	test: string;
	test2: string;
};

const FormStateInfo = ({ control }: { control: Control<FormValue> }) => {
	const {
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
	} = useFormState({ control });
	return (
		<>
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
		</>
	);
};

export default function Form6() {
	const { register, control, handleSubmit } = useForm<FormValue>({
		mode: 'onChange',
		defaultValues: () => {
			return new Promise((resolve) => {
				setTimeout(() => resolve({ test: '123', test2: 'testtest' }), 1000);
			});
		},
	});
	const onSubmit = (data: FormValue) => {
		console.log(data);
		return new Promise((resolve) => {
			setTimeout(() => resolve(data), 1000);
		});
	};

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
			</form>
			<FormStateInfo control={control} />
		</>
	);
}
