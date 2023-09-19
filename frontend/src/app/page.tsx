'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

import * as React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { SymbolicRoots, SymbolicRootsParams } from '@/lib/types';
import { useState } from 'react';
import toast from 'react-hot-toast';

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

	const result: ResultType = await response.json();
	return result;
};
export function SymbolicRootSolver() {
	const form = useForm<z.infer<typeof SymbolicRootsParams>>({
		resolver: zodResolver(SymbolicRootsParams),
	});

	const [solution, setSolution] = useState<z.infer<
		typeof SymbolicRoots
	> | null>(null);

	async function onSubmit(data: z.infer<typeof SymbolicRootsParams>) {
		const fetchAndSet = async () => {
			const result = await fetchSymbolicRoots(data);
			setSolution(result);
		};
		toast.promise(
			fetchAndSet(),
			{
				loading: 'Calculating...',
				success: 'Success!',
				error: 'The expression is not valid',
			}
		);
	}

	return (
		<Card className='w-[350px]'>
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
										<Input
											{...field}
											placeholder='x**2 + 2x + 1'
										/>
									</FormControl>
									<FormDescription>
										Use Python syntax
									</FormDescription>
								</FormItem>
							)}
						/>
            {solution && (
              <div>
                Expresion evaluada: {solution.expression}
                <br />
                Raices: {solution.roots}
              </div>
            )}
					</CardContent>
					<CardFooter className='flex justify-between'>
						<Button variant='outline' onClick={form.reset}>
							Limpiar
						</Button>
						<Button onClick={form.submit}>Calcular</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}

export function HomePage() {
	return (
		<section className='container grid grid-flow-col items-center gap-6 pb-8 pt-6 md:py-10'>
			<div className='flex flex-col items-start gap-2'>
				<SymbolicRootSolver />
			</div>
			<div className='flex flex-col items-start gap-2'>
				{/* <CardWithForm /> */}
			</div>
			<div className='flex flex-col items-start gap-2'>
				{/* <CardWithForm /> */}
			</div>
		</section>
	);
}

export default HomePage;
