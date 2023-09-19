from fastapi import FastAPI
from methods.bisection import BisectionRootsParams, bisection_roots
from methods.newton import newton_roots
from methods.symbolic import SymbolicRootsParams, symbolic_roots

app = FastAPI()


# For root finder methods one good aditional parameter would be Error method (absolute,relative, etc)
@app.post("/roots/symbolic")
def get_symbolic_roots(params: SymbolicRootsParams):
    solution = symbolic_roots(params.expression)
    return solution

@app.post("/roots/bisection")
def get_bisection_roots(params: BisectionRootsParams):
    solution = bisection_roots(params.expression, params.a, params.b, params.tol, params.niter)
    return solution


@app.post("/roots/newton")
def get_newton_roots(params: BisectionRootsParams):
    solution = newton_roots(params.expression, params.x0, params.tol, params.niter)
    return solution
