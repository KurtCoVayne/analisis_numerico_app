'use client';
// import FalsePositionSolver from '@/components/FalsePositionSolver';
// import FixedPointRootSolver from '@/components/FixedPointSolver';
// import SecantRootSolver from '@/components/SecantSolver';
import dynamic from 'next/dynamic';
const SymbolicRootSolver = dynamic(
	() => import('@/components/SymbolicSolver'),
	{ ssr: false }
);
const BisectionRootSolver = dynamic(
	() => import('@/components/BisectionSolver'),
	{ ssr: false }
);
const NewtonRootSolver = dynamic(
	() => import('@/components/NewtonSolver'),
	{ ssr: false }
);

const FixedPointRootSolver = dynamic(
	() => import('@/components/FixedPointSolver'),
	{ ssr: false }
);

const FalsePositionSolver = dynamic(
	() => import('@/components/FalsePositionSolver'),
	{ ssr: false }
);

const SecantRootSolver = dynamic(
	() => import('@/components/SecantSolver'),
	{ ssr: false }
);

import * as React from 'react';

function Home() {
	return (
		<section className='container grid  items-center gap-6 pb-8 pt-6 md:py-10'>
			<div className='w-100items-start gap-2'>
				<SymbolicRootSolver />
			</div>
			<div className='w-100 items-start gap-2'>
				<BisectionRootSolver />
			</div>
			<div className='w-100 items-start gap-2'>
				<NewtonRootSolver />
			</div>
			<div className='w-100 items-start gap-2'>
				<FixedPointRootSolver />
			</div>
			<div className='w-100 items-start gap-2'>
				<FalsePositionSolver />
			</div>
			<div className='w-100 items-start gap-2'>
				<SecantRootSolver />
			</div>

		</section>
	);
}

export default Home;
