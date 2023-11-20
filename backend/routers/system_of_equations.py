from typing import Optional, Union

from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from methods.jacobi import JacobiParams, JacobiResult, jacobi_method

router = APIRouter(
    prefix="/system-of-equations",
    tags=["system_of_equations"],
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
    "/jacobi",
    response_model=JacobiResult,
    responses={
        200: {
            "model": JacobiResult,
        },
        **responses,
    },
)
def jacobi(
    params: JacobiParams,
) -> Union[JacobiResult, JSONResponse]:
    try:
        solution = jacobi_method(params)
        return solution
    except Exception as e:
        return JSONResponse(
            status_code=409,
            content={
                "detail": "Cannot find roots with the given parameters",
                "error": str(e),
            }
        )