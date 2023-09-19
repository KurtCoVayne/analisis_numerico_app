from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from methods.bisection import (BisectionRoots, BisectionRootsParams,
                               bisection_roots)
from methods.newton import NewtonRoots, NewtonRootsParams, newton_roots
from methods.symbolic import SymbolicRoots, SymbolicRootsParams, symbolic_roots

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# For root finder methods one good aditional parameter would be Error method (absolute,relative, etc)
@app.post("/roots/symbolic")
def get_symbolic_roots(params: SymbolicRootsParams) -> SymbolicRoots:
    solution = symbolic_roots(params.expression)
    return solution


@app.post("/roots/bisection")
def get_bisection_roots(params: BisectionRootsParams) -> BisectionRoots:
    solution = bisection_roots(
        params.expression, params.a, params.b, params.tol, params.niter
    )
    return solution


@app.post("/roots/newton")
def get_newton_roots(params: NewtonRootsParams) -> NewtonRoots:
    solution = newton_roots(params.expression, params.x0, params.tol, params.niter)
    return solution
