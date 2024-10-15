import { useForm, useWatch, Control } from 'react-hook-form';

type FormValue = {
	test: string;
};

let rootRerender = 0;
let childRerender = 0;

const Child = ({ control }: { control: Control<FormValue> }) => {
	console.log('childRerender', ++childRerender);
	const test = useWatch({ name: 'test', control });
	return <p>{test}</p>;
};

export default function Form5() {
	console.log('rootRerender', ++rootRerender);
	const { register, control, handleSubmit } = useForm<FormValue>({
		mode: 'onChange',
		defaultValues: { test: '123' },
	});
	const onSubmit = (data: FormValue) => console.log(data);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register('test', {
						maxLength: { value: 5, message: '최대 5자' },
					})}
				/>
				<input type="submit" />
			</form>
			<Child control={control} />
		</>
	);
}
