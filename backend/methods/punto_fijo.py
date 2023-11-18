import numpy as np
import pandas as pd

def PuntoFijo(f,g,x0,tol,niter,err):
    x = [x0]
    gi  = [g(x0)]
    fi = [f(x0)]
    Error = [x0]
    for i in range(0,niter):
        x.append(g(gi[i]))
        gi.append(g(x[i+1]))
        fi.append(f(x[i+1]))

    if err == 0:
        Error.append(np.abs(x[i]-x[i+1]))
    elif err == 1:
        Error.append(np.abs((x[i]-x[i+1])/x[i+1]))

    if Error[i+1] < tol:
        return(pd.DataFrame(list(zip(x,gi,fi,Error)), columns = ["x","g(x)","f(x)","Error"]))
