import numpy as np
import pandas as pd

def Vandermonde(x,y):
    A = np.zeros((len(x),len(x)))
    for i in range(0,len(x)):
        for j in range(0,len(x)):
            A[i][j] = np.power(x[i],j)
    b = np.array(y)
    return np.flip(np.linalg.solve(A, b))