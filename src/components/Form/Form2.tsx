import { useForm } from 'react-hook-form';

interface IFormInput {
	firstName: string;
	lastName: string;
}

export default function Form2() {
	const { register, formState, setError } = useForm<IFormInput>({
		mode: 'onChange',
		defaultValues: {
			firstName: 'a',
			lastName: 'b',
		},
	});
	const { errors } = formState;

	return (
		<>
			<form>
				<input
					{...register('firstName', {
						required: '필수',
						maxLength: { value: 10, message: '최대 10자' },
						pattern: { value: /^[A-Za-z]+$/i, message: '알파벳' },
					})}
				/>
				<input {...register('lastName')} />
				<input type="submit" />
				<p>errors.firstName.message: {errors.firstName?.message}</p>
				<p>errors.lastName.message: {errors.lastName?.message}</p>
			</form>
			<button
				onClick={() =>
					setError('firstName', { type: 'manual', message: 'Set Error' })
				}
			>
				setError
			</button>
		</>
	);
}
