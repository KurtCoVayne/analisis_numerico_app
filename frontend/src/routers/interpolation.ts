
import { HTTPValidationError, HTTPValidationErrorType, LagranInt, LagranIntType, LagranParamsType, MethodError, MethodErrorType, VanderInt, VanderIntType, VanderParamsType } from "@/lib/types";
import { SplineParamsType, SplineType, SplineTypeType } from "@/lib/types";
import { NewtonInt, NewtonIntType, NewtonParamsType, } from "@/lib/types";


export async function lagrangeInterpolation(
    params: LagranParamsType
): Promise<LagranIntType | MethodErrorType | HTTPValidationErrorType> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/interpolation/lagrange`,
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
        return LagranInt.parse(json);
    }

    if (response.status === 409) {
        return MethodError.parse(json);
    }

    if (response.status === 422) {
        return HTTPValidationError.parse(json);
    }

    if (response.status >= 500) {
        return MethodError.parse({
            detail: 'Cannot compute interpolation',
            error: 'Internal Server Error',
        });
    }

    throw new Error(`Unexpected response status ${response.status}`);
}


// splines

export async function splineInterpolation(
    params: SplineParamsType
): Promise<SplineTypeType | MethodErrorType | HTTPValidationErrorType> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/interpolation/spline`,
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
        return SplineType.parse(json);
    }

    if (response.status === 409) {
        return MethodError.parse(json);
    }

    if (response.status === 422) {
        return HTTPValidationError.parse(json);
    }

    if (response.status >= 500) {
        return MethodError.parse({
            detail: 'Cannot compute interpolation',
            error: 'Internal Server Error',
        });
    }

    throw new Error(`Unexpected response status ${response.status}`);
}

export async function vandermondeInterpolation(
    params: VanderParamsType
): Promise<VanderIntType | MethodErrorType | HTTPValidationErrorType> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/interpolation/vandermonde`,
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
        return VanderInt.parse(json);
    }

    if (response.status === 409) {
        return MethodError.parse(json);
    }

    if (response.status === 422) {
        return HTTPValidationError.parse(json);
    }

    if (response.status >= 500) {
        return MethodError.parse({
            detail: 'Cannot compute interpolation',
            error: 'Internal Server Error',
        });
    }

    throw new Error(`Unexpected response status ${response.status}`);
}

// Newton Interpolation

export async function newtonInterpolation(
    params: NewtonParamsType
): Promise<NewtonIntType | MethodErrorType | HTTPValidationErrorType> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/interpolation/newton`,
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
        return NewtonInt.parse(json);
    }

    if (response.status === 409) {
        return MethodError.parse(json);
    }

    if (response.status === 422) {
        return HTTPValidationError.parse(json);
    }

    if (response.status >= 500) {
        return MethodError.parse({
            detail: 'Cannot compute interpolation',
            error: 'Internal Server Error',
        });
    }

    throw new Error(`Unexpected response status ${response.status}`);
}