from typing import Optional, Union

from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from methods.spline import Spline, SplineParams, get_spline


router = APIRouter(
    prefix="/interpolation",
    tags=["interpolation"],
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
    "/splines",
    response_model=Spline,
    responses={
        200: {
            "model": Spline,
        },
        **responses,
    },
)
def get_splines(
    params: SplineParams,
) -> Union[Spline, JSONResponse]:
    try:
        print(params)
        solution = get_spline(params.x, params.y, params.d)
        return solution
    except Exception as e:
        return JSONResponse(
            status_code=409,
            content={
                "detail": "Cannot find roots with the given parameters",
                "error": str(e),
            }
        )