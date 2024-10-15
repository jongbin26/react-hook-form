import { useForm, Resolver } from 'react-hook-form';

type FormValues = {
	firstName: string;
	lastName: string;
};

const resolver: Resolver<FormValues> = async (values, context) => {
	return {
		values: values.firstName ? values : {},
		errors: !values.firstName
			? {
					firstName: {
						type: 'required',
						message: `This is required. ${context.text}`,
					},
			  }
			: {},
	};
};

export default function Form1() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({ resolver, context: { text: 'Context' } });
	const onSubmit = handleSubmit((data) => console.log(data));

	return (
		<form onSubmit={onSubmit}>
			<input {...register('firstName')} placeholder="Bill" />
			{errors?.firstName && <p>{errors.firstName.message}</p>}

			<input {...register('lastName')} placeholder="Luo" />

			<input type="submit" />
		</form>
	);
}
