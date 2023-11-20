from typing import Optional, Union

from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from methods.punto_fijo import FixedPointParams, FixedPointRoots, fixed_point_roots

from methods.bisection import (BisectionRoots, BisectionRootsParams,
                               bisection_roots)
from methods.newton import NewtonRoots, NewtonRootsParams, newton_roots
from methods.symbolic import SymbolicRoots, SymbolicRootsParams, symbolic_roots

router = APIRouter(
    prefix="/roots",
    tags=["roots"],
)


class MethodError(BaseModel):
    detail: str
    error: Optional[str] = None


responses = {
    409: {
        "description": "Cannot find roots with the given parameters",
        "model": MethodError,
    },
}


@router.post(
    "/symbolic",
    response_model=SymbolicRoots,
    responses={
        200: {
            "model": SymbolicRoots,
        },
        **responses,
    },
)
def get_symbolic_roots(
    params: SymbolicRootsParams,
) -> Union[SymbolicRoots, JSONResponse]:
    try:
        solution = symbolic_roots(params.expression)
        return solution
    except Exception as e:
        return JSONResponse(
            status_code=409,
            content={
                "detail": "Cannot find roots with the given parameters",
                "error": str(e),
            }
        )


@router.post(
    "/bisection",
    response_model=BisectionRoots,
    responses={
        200: {"model": BisectionRoots},
        400: {
            "description": "Wrong parameters",
            "model": MethodError,
        },
        **responses,
    },
)
def get_bisection_roots(
    params: BisectionRootsParams,
) -> Union[BisectionRoots, JSONResponse]:
    try:
        solution = bisection_roots(
            params.expression,
            params.error_type,
            params.a,
            params.b,
            params.tol,
            params.niter,
        )
        return solution
    except AssertionError as e:
        return JSONResponse(
            status_code=400,
            content={
                "detail": "Cannot find roots with the given parameters",
                "error": str(e),
            }
        )
    except Exception as e:
        return JSONResponse(
            status_code=409,
            content={
                "detail": "Cannot find roots with the given parameters",
                "error": str(e),
            },
        )


@router.post(
    "/newton",
    response_model=NewtonRoots,
    responses={
        200: {"model": NewtonRoots},
        **responses,
    },
)
def get_newton_roots(params: NewtonRootsParams) -> NewtonRoots:
    try:
        solution = newton_roots(
            params.expression, params.error_type, params.x0, params.tol, params.niter
        )
        return solution
    except Exception as e:
        return JSONResponse(
            status_code=409,
            content={
                "detail": "Cannot find roots with the given parameters",
                "error": str(e),
            },
        )

@router.post(
    "/fixed_point",
    response_model=FixedPointRoots,
    responses={
        200: {"model": FixedPointRoots},
        **responses,
    },
)
def get_fixed_point_params(params: FixedPointParams) -> FixedPointRoots:
    try:
        solution = fixed_point_roots(
            params.f_expr, params.g_expr, params.x0, params.error_type, params.tol, params.niter
        )
        return solution
    except Exception as e:
        return JSONResponse(
            status_code=409,
            content={
                "detail": "Cannot find roots with the given parameters",
                "error": str(e),
            },
        )
