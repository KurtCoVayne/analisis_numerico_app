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
import { BisectionRootsParams, BisectionRoots } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { addStyles, EditableMathField, StaticMathField } from 'react-mathquill';
import { Table, TableHead, TableRow, TableCell, TableBody, TableHeader } from './ui/table';

addStyles();

type ParamsType = z.infer<typeof BisectionRootsParams>;
type ResultType = z.infer<typeof BisectionRoots>;
const fetchBisectionRoots = async (params: ParamsType) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/roots/bisection`,
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
export function BisectionRootSolver() {
	const form = useForm<ParamsType>({
		resolver: zodResolver(BisectionRootsParams),
	});

	const [solution, setSolution] = useState<ResultType | null>(null);

	async function onSubmit(data: ParamsType) {
		const fetchAndSet = async () => {
			const result = await fetchBisectionRoots(data);
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
						<CardTitle>Solve Bisection roots</CardTitle>
						<CardDescription>
							Use Bisection math to solve roots of (almost) any
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
											style={{
												fontSize: '1.5rem',
												width: '100%',
											}}
										/>
									</FormControl>
									<FormDescription>
										Enter your mathematical expression in LaTeX format with respect to x
									</FormDescription>
                                    <FormMessage/>
								</FormItem>
							)}
						/>

                        <FormField
                            control={form.control}
                            name='a'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor={field.name}>
                                        a
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.0000000001"  {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Left limit of the interval
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='b'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor={field.name}>
                                        b
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.0000000001"  {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Right limit of the interval
                                    </FormDescription>
                                    <FormMessage/>
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
                                        <Input type="number" step="0.0000000001" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Tolerance value
                                    </FormDescription>
                                    <FormMessage/>
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
                                        <Input type="number" {...field} />
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
									Expresion evaluada:{' '}
									<StaticMathField>
										{solution.expression}
									</StaticMathField>
								</div>
								<div className='flex flex-col gap-1'>
									Raiz encontrada:{' '}
									<StaticMathField>
										{solution.root.toFixed(20)}
									</StaticMathField>
								</div>
								<div className=''>
									Iteraciones:{' '}
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Iteracion</TableHead>
												<TableHead>
													<StaticMathField>
														a
													</StaticMathField>
												</TableHead>
												<TableHead>
													<StaticMathField>
														x_m
													</StaticMathField>
												</TableHead>
												<TableHead>
													<StaticMathField>
														b
													</StaticMathField>
												</TableHead>

												<TableHead>
													<StaticMathField>
														f(xm)
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
															{iteration.a}
														</TableCell>
														<TableCell>
															{iteration.xm}
														</TableCell>
														<TableCell>
															{iteration.b}
														</TableCell>
														<TableCell>
															{iteration.f_xm}
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
							Limpiar
						</Button>
						<Button type='submit'>Calcular</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}

export default BisectionRootSolver;
