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
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { NewtonRootsParams, NewtonRoots } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { addStyles, EditableMathField, StaticMathField } from 'react-mathquill';
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableHeader,
	TableCaption,
} from './ui/table';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';

addStyles();

type ParamsType = z.infer<typeof NewtonRootsParams>;
type ResultType = z.infer<typeof NewtonRoots>;
const fetchNewtonRoots = async (params: ParamsType) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/roots/newton`,
		{
			method: 'POST',
			body: JSON.stringify(params),
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);

	if (!response.ok) throw new Error('The expression is not valid');

	const result: ResultType = await response.json();
	return result;
};
export function NewtonRootSolver() {
	const form = useForm<ParamsType>({
		resolver: zodResolver(NewtonRootsParams),
	});

	const [solution, setSolution] = useState<ResultType | null>(null);

	async function onSubmit(data: ParamsType) {
		const fetchAndSet = async () => {
			const result = await fetchNewtonRoots(data);
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
						<CardTitle>Solve Newton roots</CardTitle>
						<CardDescription>
							Use Newton math to solve roots of (almost) any
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
											latex={field.value ?? ''}
											onChange={(mathField) => {
												field.onChange(
													mathField.latex()
												);
											}}
											className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
										/>
									</FormControl>
									<FormDescription>
										Enter your mathematical expression in
										LaTeX format with respect to x
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='error_type'
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor={field.name}>
										Error type
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select an option' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='absolute'>
												Absolute
											</SelectItem>
											<SelectItem value='relative'>
												Relative
											</SelectItem>
										</SelectContent>
									</Select>
									<FormDescription>
										Select the error type
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='x0'
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor={field.name}>
										x0
									</FormLabel>
									<FormControl>
										<Input
											type='number'
											step='0.0000000001'
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Initial Value
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='tol'
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor={field.name}>
										Tolerance
									</FormLabel>
									<FormControl>
										<Input
											type='number'
											step='0.0000000001'
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Tolerance value
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='niter'
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor={field.name}>
										Max iterations
									</FormLabel>
									<FormControl>
										<Input type='number' {...field} />
									</FormControl>
									<FormDescription>
										Max number of iterations
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
									Expression Derivative:{' '}
									<StaticMathField>
										{solution.derivative}
									</StaticMathField>
								</div>
								<div className='flex flex-col gap-1'>
									Raiz encontrada:{' '}
									<StaticMathField>
										{solution.root.toFixed(20)}
									</StaticMathField>
								</div>
								<div className=''>
									<Table>
										<TableCaption>Iterations</TableCaption>
										<TableHeader>
											<TableRow>
												<TableHead>Iteration</TableHead>
												<TableHead>
													<StaticMathField>
														x
													</StaticMathField>
												</TableHead>
												<TableHead>
													<StaticMathField>
														f(x)
													</StaticMathField>
												</TableHead>
												<TableHead>
													<StaticMathField>
														f\prime(x)
													</StaticMathField>
												</TableHead>
												<TableHead>
													<StaticMathField>
														Error
													</StaticMathField>
												</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{solution.table.map(
												(iteration, index) => (
													<TableRow key={index}>
														<TableCell>
															{
																iteration.iteration
															}
														</TableCell>
														<TableCell>
															{iteration.x}
														</TableCell>
														<TableCell>
															{iteration.f_x}
														</TableCell>
														<TableCell>
															{
																iteration.f_prime_x
															}
														</TableCell>
														<TableCell>
															{iteration.error}
														</TableCell>
													</TableRow>
												)
											)}
										</TableBody>
									</Table>
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

export default NewtonRootSolver;
