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
	FixedPointParamsType,
	FixedPointRootsType,
	FixedPointRoots,
	FalseRuleParamsType,
	FalseRuleRoots,
	FalseRuleRootsType,
	SecanteParamsType,
	SecanteRoots,
	SecanteRootsType,
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

	if (response.status >= 500) {
		return MethodError.parse({
			detail: 'Cannot compute roots',
			error: 'Internal Server Error',
		});
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

	if (response.status >= 500) {
		return MethodError.parse({
			detail: 'Cannot compute roots',
			error: 'Internal Server Error',
		});
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

	if (response.status >= 500) {
		return MethodError.parse({
			detail: 'Cannot compute roots',
			error: 'Internal Server Error',
		});
	}

	throw new Error(`Unexpected response status ${response.status}`);
}


export async function fixedPointRoots(
  params: FixedPointParamsType
): Promise<FixedPointRootsType | MethodErrorType | HTTPValidationErrorType> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/roots/fixedpoint`,
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
    return FixedPointRoots.parse(json);
  }

  if (response.status === 409) {
    return MethodError.parse(json);
  }

  if (response.status === 422) {
    return HTTPValidationError.parse(json);
  }

  if (response.status >= 500) {
    return MethodError.parse({
      detail: 'Cannot compute roots',
      error: 'Internal Server Error',
    });
  }

  throw new Error(`Unexpected response status ${response.status}`);
}

export async function falseRuleRoots(
	params: FalseRuleParamsType
  ): Promise<FalseRuleRootsType | MethodErrorType | HTTPValidationErrorType> {
	const response = await fetch(
	  `${process.env.NEXT_PUBLIC_API_URL}/roots/falserule`,
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
	  return FalseRuleRoots.parse(json);
	}
  
	if (response.status === 409) {
	  return MethodError.parse(json);
	}
  
	if (response.status === 422) {
	  return HTTPValidationError.parse(json);
	}
  
	if (response.status >= 500) {
	  return MethodError.parse({
		detail: 'Cannot compute roots',
		error: 'Internal Server Error',
	  });
	}
  
	throw new Error(`Unexpected response status ${response.status}`);
  }
  
  export async function secanteRoots(
	params: SecanteParamsType
  ): Promise<SecanteRootsType | MethodErrorType | HTTPValidationErrorType> {
	const response = await fetch(
	  `${process.env.NEXT_PUBLIC_API_URL}/roots/secante`,
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
	  return SecanteRoots.parse(json);
	}
  
	if (response.status === 409) {
	  return MethodError.parse(json);
	}
  
	if (response.status === 422) {
	  return HTTPValidationError.parse(json);
	}
  
	if (response.status >= 500) {
	  return MethodError.parse({
		detail: 'Cannot compute roots',
		error: 'Internal Server Error',
	  });
	}
  
	throw new Error(`Unexpected response status ${response.status}`);
  }
  