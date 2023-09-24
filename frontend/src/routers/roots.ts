import {
	BisectionRoots,
	HTTPValidationError,
	type BisectionRootsParamsType,
	type BisectionRootsType,
	type HTTPValidationErrorType,
	type MethodErrorType,
	MethodError,
	NewtonRootsParamsType,
	NewtonRootsType,
	NewtonRoots,
	SymbolicRootsParamsType,
	SymbolicRootsType,
	SymbolicRoots,
} from '../lib/types';

export async function bisectionRoots(
	params: BisectionRootsParamsType
): Promise<BisectionRootsType | MethodErrorType | HTTPValidationErrorType> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/roots/bisection`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		}
	);

	const json = await response.json();

	if (response.status === 200) {
		return BisectionRoots.parse(json);
	}

	if (response.status === 409 || response.status === 400) {
		return MethodError.parse(json);
	}

	if (response.status === 422) {
		return HTTPValidationError.parse(json);
	}

	throw new Error(`Unexpected response status ${response.status}`);
}

export async function symbolicRoots(
	params: SymbolicRootsParamsType
): Promise<SymbolicRootsType | MethodErrorType | HTTPValidationErrorType> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/roots/symbolic`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		}
	);

	const json = await response.json();

	if (response.status === 200) {
		return SymbolicRoots.parse(json);
	}

	if (response.status === 409) {
		return MethodError.parse(json);
	}

	if (response.status === 422) {
		return HTTPValidationError.parse(json);
	}

	throw new Error(`Unexpected response status ${response.status}`);
}

export async function newtonRoots(
	params: NewtonRootsParamsType
): Promise<NewtonRootsType | MethodErrorType | HTTPValidationErrorType> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/roots/newton`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		}
	);

	const json = await response.json();

	if (response.status === 200) {
		return NewtonRoots.parse(json);
	}

	if (response.status === 409) {
		return MethodError.parse(json);
	}

	if (response.status === 422) {
		return HTTPValidationError.parse(json);
	}

	throw new Error(`Unexpected response status ${response.status}`);
}
