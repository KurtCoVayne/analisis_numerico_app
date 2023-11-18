import numpy as np
import pandas as pd

def ReglaFalsa(f,xl,xu,tol,niter,err):
    """
    INPUT ARGS:

    f: Python Function with a single input argument
    xl: Lower Bound
    xu: Upper Bound
    tol: Error tolerance for the method
    niter: Max number of iterations
    err: Type of error processing, 0 = absolute, 1 = relative
    """
    xl = [xl]
    xu = [xu]
    yl = [round(f(xl[0]),10)]
    yu = [round(f(xu[0]),10)]

    Error = [xu[0]]
    xr = []
    yr = []

    if yl[0]*yu[0] > 0:
        print(f"NO HAY RAIZ EN EL INTERVALO [{xl[0]},{xu[0]}]")
        return None
    xr.append(round(xu[0]-yu[0]*((xu[0]-xl[0])/(yu[0]-yl[0])),10))
    yr.append(round(f(xr[0]),10))
    for i in range(0,niter):

        if f(xr[i])*f(xl[i]) > 0:
            xl.append(xr[i])
            xu.append(xu[i])
            yl.append(round(f(xl[i+1]),10))
            yu.append(round(f(xu[i+1]),10))

        elif f(xr[i])*f(xu[i]) > 0:
            xl.append(xl[i])
            xu.append(xr[i])
            yl.append(round(f(xl[i+1]),10))
            yu.append(round(f(xu[i+1]),10))

        xr.append(round(xu[i+1]-yu[i+1]*((xu[i+1]-xl[i+1])/(yu[i+1]-yl[i+1])),10))
        yr.append(round(f(xr[i+1]),10))

        if err == 0:
            Error.append(round(np.abs(xr[i]-xr[i+1]),10))
        elif err == 1:
            Error.append(round(np.abs((xr[i]-xr[i+1])/xr[i+1]),10))

        if Error[-1] < tol:
            return(pd.DataFrame(list(zip(xl,xu,xr,yr,Error)), columns = ["xl","xu","xr","f(xr)","Error"]))
        