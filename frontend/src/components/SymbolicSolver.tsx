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
											className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
										/>
									</FormControl>
									<FormDescription>
										Enter your mathematical expression in LaTeX format with respect to x
									</FormDescription>
								</FormItem>
							)}
						/>
						{solution && (
							<div className='flex flex-col gap-2'>
								<div className='flex flex-col gap-1'>
									Evaluated Expression:{' '}
									<StaticMathField>
										{solution.expression}
									</StaticMathField>
								</div>
								<div className='flex flex-col gap-1'>
									Roots:{' '}
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
							Clear
						</Button>
						<Button type='submit'>Calculate</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}

export default SymbolicRootSolver;
