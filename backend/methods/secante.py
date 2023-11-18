import numpy as np
import pandas as pd

def Secante(f,x0,x1,niter,tol,err):
    """
        INPUT ARGS:

        f: Python Function with a single input argument
        x0: first initial value
        x1: second initial value
        tol: Error tolerance for the method
        niter: Max number of iterations
        err: Type of error processing, 0 = absolute, 1 = relative
    """
    fi = [f(x0),f(x1)]
    x = [x0,x1]
    Error = [1]
    for i in range(0,niter):
        if err == 0:
            Error.append(np.abs(x[i]-x[i+1]))
        elif err == 1:
            Error.append(np.abs((x[i]-x[i+1])/x[i+1]))
        x.append(x[i+1]-((fi[i+1]*(x[i+1]-x[i]))/(fi[i+1]-fi[i])))
        fi.append(f(x[-1]))
        if Error[-1] < tol:
            return(pd.DataFrame(list(zip(x,fi,Error)), columns = ["x","f(x)","Error"]))