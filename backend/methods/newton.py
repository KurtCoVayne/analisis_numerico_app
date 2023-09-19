from typing import Callable, List, Tuple

import pandas as pd
import sympy
from pydantic import BaseModel

from utils.parsing import ExpressionAnnotation, to_latex


class NewtonIteration(BaseModel):
    iteration: int
    x: float
    f_x: float
    f_prime_x: float
    error: float


class NewtonRoots(BaseModel):
    expression: str
    derivative: str
    root: float
    table: List[NewtonIteration]


class NewtonRootsParams(BaseModel):
    expression: ExpressionAnnotation
    x0: float
    tol: float
    niter: int


def newton_roots(expr: sympy.Expr, x0: float, tol: float, niter: int) -> NewtonRoots:
    """
    Find a root of a function using the Newton-Raphson method, requires a function to be continuous in the interval [a, b] and f(a) * f(b) < 0.

    Parameters
    ==========

    expr: A sympy expression representing the function.
    x0: The initial value.
    tol: The tolerance of the method.
    niter: The maximum number of iterations.
    """

    x = sympy.symbols("x")
    expr_prime = expr.diff(x)
    f: Callable[[float], float] = sympy.lambdify(x, expr, "numpy")
    f_prime: Callable[[float], float] = sympy.lambdify(x, expr_prime, "numpy")

    x_old = x0
    fx_old = f(x_old)
    fx_prime_old = f_prime(x_old)
    error = tol + 1
    iteration = 1
    data = [{"iteration": 1, "x": x_old, "f_x": fx_old, "f_prime_x": fx_prime_old, "error": error}]

    while error > tol and fx_old != 0 and fx_prime_old != 0 and iteration < niter:
        x_new = x_old - fx_old / fx_prime_old
        fx_new = f(x_new)
        fx_prime_new = f_prime(x_new)
        error = abs(x_new - x_old)
        x_old = x_new
        fx_old = fx_new
        fx_prime_old = fx_prime_new
        iteration += 1

        it_data = {
            "iteration": iteration,
            "x": x_new,
            "f_x": fx_new,
            "f_prime_x": fx_prime_new,
            "error": error,
        }
        data.append(it_data)

    if error < tol or fx_old == 0 or fx_prime_old == 0:
        return NewtonRoots(
            derivative=to_latex(expr_prime),
            root=x_new,
            table=data,
            expression=to_latex(expr),
        )

    raise ValueError(f"Failed after {niter} iterations")
