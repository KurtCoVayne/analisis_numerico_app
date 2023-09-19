import { Button } from '@/components/ui/button';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SymbolicRootsParams, SymbolicRoots } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { addStyles, EditableMathField, StaticMathField } from 'react-mathquill';

addStyles();

type ParamsType = z.infer<typeof SymbolicRootsParams>;
type ResultType = z.infer<typeof SymbolicRoots>;
const fetchSymbolicRoots = async (params: ParamsType) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/roots/symbolic`,
		{
			method: 'POST',
			body: JSON.stringify(params),
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);

	if(!response.ok) throw new Error('The expression is not valid');

	const result: ResultType = await response.json();
	return result;
};
export function SymbolicRootSolver() {
	const form = useForm<ParamsType>({
		resolver: zodResolver(SymbolicRootsParams),
	});

	const [solution, setSolution] = useState<ResultType | null>(null);

	async function onSubmit(data: ParamsType) {
		const fetchAndSet = async () => {
			const result = await fetchSymbolicRoots(data);
			setSolution(result);
		};
		toast.promise(fetchAndSet(), {
			loading: 'Calculating...',
			success: 'Success!',
			error: 'The expression is not valid',
		});
	}

	return (
		<Card>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardHeader>
						<CardTitle>Solve symbolic roots</CardTitle>
						<CardDescription>
							Use symbolic math to solve roots of (almost) any
							function.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<FormField
							control={form.control}
							name='expression'
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor={field.name}>
										Expression
									</FormLabel>
									<FormControl>
										<EditableMathField
											{...field}
											latex={field.value ?? ""}
											onChange={(mathField) => {
												field.onChange(
													mathField.latex()
												);
											}}
											style={{
												fontSize: '1.5rem',
												width: '100%',
											}}
										/>
									</FormControl>
									<FormDescription>
										Ingrese su expresión matematica en LaTeX
									</FormDescription>
								</FormItem>
							)}
						/>
						{solution && (
							<div className='flex flex-col gap-2'>
								<div className='flex flex-col gap-1'>
									Expresion evaluada:{' '}
									<StaticMathField>
										{solution.expression}
									</StaticMathField>
								</div>
								<div className='flex flex-col gap-1'>
									Raices:{' '}
									<StaticMathField>
										{solution.roots}
									</StaticMathField>
								</div>
							</div>
						)}
					</CardContent>
					<CardFooter className='flex justify-between'>
						<Button
							type='reset'
							variant='outline'
							onClick={() => {
								form.reset();
								setSolution(null);
							}}
						>
							Limpiar
						</Button>
						<Button type='submit'>Calcular</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}

export default SymbolicRootSolver;
