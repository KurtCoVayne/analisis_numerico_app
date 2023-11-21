import {
  JacobiParamsType,
  JacobiResultType,
  GaussSeidelParamsType,
  GaussSeidelResultType,
  SORParamsType,
  SORResultType,
  MethodErrorType,
  HTTPValidationErrorType,
  GaussSeidelResult,
  HTTPValidationError,
  JacobiResult,
  MethodError,
  SORResult,
} from '../lib/types';

// Function for Jacobi method
export async function jacobiMethod(
  params: JacobiParamsType
): Promise<JacobiResultType | MethodErrorType | HTTPValidationErrorType> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/equations/jacobi`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const json = await response.json();

  if (response.status === 200) {
    return JacobiResult.parse(json);
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

// Function for Gauss-Seidel method
export async function gaussSeidelMethod(
  params: GaussSeidelParamsType
): Promise<GaussSeidelResultType | MethodErrorType | HTTPValidationErrorType> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/equations/gauss-seidel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const json = await response.json();

  if (response.status === 200) {
    return GaussSeidelResult.parse(json);
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

// Function for SOR method
export async function sorMethod(
  params: SORParamsType
): Promise<SORResultType | MethodErrorType | HTTPValidationErrorType> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/equations/sor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const json = await response.json();

  if (response.status === 200) {
    return SORResult.parse(json);
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