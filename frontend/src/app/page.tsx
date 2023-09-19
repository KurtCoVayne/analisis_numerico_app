'use client';
import BisectionRootSolver from '@/components/BisectionSolver';
import SymbolicRootSolver from '@/components/SymbolicSolver';
import * as React from 'react';

export function HomePage() {
	return (
		<section className='container grid  items-center gap-6 pb-8 pt-6 md:py-10'>
			<div className='w-100items-start gap-2'>
				<SymbolicRootSolver />
			</div>
			<div className='w-100 items-start gap-2'>
				<BisectionRootSolver />
			</div>
			<div className='flex flex-col items-start gap-2'>
				{/* <CardWithForm /> */}
			</div>
		</section>
	);
}

export default HomePage;
