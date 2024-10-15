import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
	firstName: string;
	lastName: string;
	age: number;
}

export default function Form() {
	const [defaultLastName, setDefaultLastName] = useState('b');
	const [lastName, setLastName] = useState('d');
	const { register, handleSubmit, formState } = useForm<IFormInput>({
		mode: 'onChange',
		defaultValues: {
			firstName: 'a',
			lastName: defaultLastName,
			age: 18,
		},
		values: {
			firstName: 'c',
			lastName,
			age: 19,
		},
		shouldUnregister: true,
		criteriaMode: 'all',
	});
	const { errors } = formState;
	const [show, setShow] = useState(true);
	const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
	console.log(errors);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register('firstName', {
						required: '필수',
						maxLength: { value: 10, message: '최대 10자' },
						pattern: { value: /^[A-Za-z]+$/i, message: '알파벳' },
					})}
				/>
				<input {...register('lastName')} />
				{show && <input type="number" {...register('age')} />}
				<input type="submit" />
				<p>errors.firstName.message: {errors.firstName?.message}</p>
				<p>errors.firstName.types: {JSON.stringify(errors.firstName?.types)}</p>
			</form>
			<button onClick={() => setDefaultLastName((v) => `${v}b`)}>
				set defaultValues
			</button>
			<button onClick={() => setLastName((v) => `${v}d`)}>set values</button>
			<button onClick={() => setShow((v) => !v)}>toggle age</button>
		</>
	);
}
