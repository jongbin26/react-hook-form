// import React from 'react';
import styled from 'styled-components';
import {
	Path,
	useForm,
	UseFormRegister,
	SubmitHandler,
	Resolver,
} from 'react-hook-form';

//enum, type, interface

interface IFormValues {
	firstName: string;
	// Age: number;
}

const resolver: Resolver<IFormValues> = async (values) => {
	return {
		values: values.firstName ? values : {},
		errors: !values.firstName
			? {
					firstName: {
						type: 'required',
						message: 'This is required.',
					},
			  }
			: {},
	};
};

type InputProps = {
	label: Path<IFormValues>;
	register: UseFormRegister<IFormValues>;
	required: boolean;
};

//component
const Input = ({ label, register, required }: InputProps) => (
	<>
		<label>{label}</label>
		<input
			{...register(label, { required })}
			// aria-invalid={errors.label ? 'true' : 'false'}
		/>
	</>
);

// const Select = React.forwardRef<
// 	HTMLSelectElement,
// 	{ label: string } & ReturnType<UseFormRegister<IFormValues>>
// >(({ onChange, onBlur, name, label }, ref) => (
// 	<>
// 		<label>{label}</label>
// 		<select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
// 			<option value="20">20</option>
// 			<option value="30">30</option>
// 		</select>
// 	</>
// ));

const Form = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormValues>({ resolver });

	const onSubmit: SubmitHandler<IFormValues> = (data) => {
		alert(JSON.stringify(data));
	};

	return (
		<FormContainer onSubmit={handleSubmit(onSubmit)}>
			<Input label="firstName" register={register} required />
			{/* <Select label="Age" {...register('Age')} /> */}
			{errors?.firstName && <p>{errors.firstName.message}</p>}

			<input type="submit" />
		</FormContainer>
	);
};

export default Form;

const FormContainer = styled.form`
	width: 500px;
	height: 800px;
	padding: 30px;

	display: flex;
	flex-direction: column;
	gap: 30px;

	border-radius: 30px;
	background: #868ec7;

	color: white;
`;
