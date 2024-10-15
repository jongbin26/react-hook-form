import { useForm, useFieldArray } from 'react-hook-form';

type FormValue = {
	focusName: string;
	list: { firstName: string; lastName: string }[];
};

export default function Form7() {
	const { register, control, handleSubmit } = useForm<FormValue>({
		defaultValues: {
			focusName: 'list.0.firstName',
			list: [{ firstName: 'Bill', lastName: 'Luo' }],
		},
	});

	const {
		fields,
		append,
		prepend,
		insert,
		swap,
		move,
		update,
		replace,
		remove,
	} = useFieldArray({ control, name: 'list' });

	const onSubmit = (data: FormValue) => console.log(data);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<ul>
					{fields.map((item, index) => (
						<li key={item.id}>
							<input {...register(`list.${index}.firstName`)} />
							<input {...register(`list.${index}.lastName`)} />
							<button onClick={() => remove(index)}>remove</button>
						</li>
					))}
				</ul>
				<input type="submit" />
			</form>
			<div>
				<button
					onClick={() =>
						append({ firstName: 'appendFirstName', lastName: 'appendLastName' })
					}
				>
					append
				</button>
				<button
					onClick={() =>
						prepend({
							firstName: 'prependFirstName',
							lastName: 'prependFirstName',
						})
					}
				>
					prepend
				</button>
				<button
					onClick={() =>
						insert(2, {
							firstName: 'insertFirstName',
							lastName: 'insertLastName',
						})
					}
				>
					insert
				</button>
				<button onClick={() => swap(1, 2)}>swap</button>
				<button onClick={() => move(1, 2)}>move</button>
				<button
					onClick={() =>
						update(1, {
							firstName: 'updateFirstName',
							lastName: 'updateLastName',
						})
					}
				>
					update
				</button>
				<button
					onClick={() =>
						replace([
							{
								firstName: 'test1',
								lastName: 'test1',
							},
							{
								firstName: 'test2',
								lastName: 'test2',
							},
						])
					}
				>
					replace
				</button>
			</div>
		</>
	);
}
