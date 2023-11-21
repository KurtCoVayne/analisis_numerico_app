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
import { SecanteParams, SecanteRoots, SecanteParamsType, MethodErrorType, ValidationErrorType, SecanteRootsType } from '@/lib/types';
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
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { secanteRoots } from '@/routers/roots';

addStyles();

type ParamsType = SecanteParamsType;

export function SecantRootSolver() {
	const form = useForm<ParamsType>({
		resolver: zodResolver(SecanteParams),
	});

	const [solution, setSolution] = useState<SecanteRootsType | null>(null);

	async function onSubmit(data: ParamsType) {
		setSolution(null);
		const toastId = toast.loading('Calculating...');
		const result = await secanteRoots(data);
		toast.dismiss(toastId);
		
		if ('error' in result) {
			toast.error(`${result.detail}: ${result.error ?? 'Unknown reason'}`);
			return;
		}

		if ('detail' in result) {
			toast.error("Validation error");
			if(!result.detail) return;
			for (const error of (result.detail as ValidationErrorType[])) {
				if(typeof error === 'string') continue;
				if (error.loc.length === 0 || typeof error.loc[0] !== 'string') {
					continue;
				}
				type ExpectedErrorType = Parameters<typeof form.setError>[0];
				form.setError(error.loc[0] as ExpectedErrorType, {
					type: 'manual',
					message: error.msg,
				});
			}
		}

		if ('table' in result) {
			toast.success('Solution found!');
			setSolution(result);
		}
	}

	return (
		<Card>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardHeader>
						<CardTitle>Solve Secant roots</CardTitle>
						<CardDescription>
							Use Secant Method math to solve roots of (almost) any
							function.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<FormField
							control={form.control}
							name='f_expr'
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
										First Point
									</FormLabel>
									<FormControl>
										<Input
											type='number'
											step='0.0000000001'
											{...field}
										/>
									</FormControl>
									<FormDescription>
										First point
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='x1'
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor={field.name}>
										Second Point
									</FormLabel>
									<FormControl>
										<Input
											type='number'
											step='0.0000000001'
											{...field}
										/>
									</FormControl>
									<FormDescription>
										RSecond Point
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
										{solution.f_expr}
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
														x_i
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
																index+1
															}
														</TableCell>
														<TableCell>
															{iteration.xi}
														</TableCell>
														<TableCell>
															{iteration.f_x}
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

export default SecantRootSolver;
