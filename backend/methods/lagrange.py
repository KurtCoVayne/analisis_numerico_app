import numpy as np
import pandas as pd

def Lagrange(x,y):
    polys = []

    for i in range(len(x)):
        num = []
        den = []
        for j in range(len(x)):
            if x[j] == x[i]:
                pass
            else:
                an = -x[j]
                if an < 0:
                    num.append(f"(x+{np.abs(x[j])})")
                    den.append(f"({x[i]}+{np.abs(x[j])})")
                elif an > 0:
                    num.append(f"(x-{x[j]})")
                    den.append(f"({x[i]}-{np.abs(x[j])})")
                else:
                    num.append("(x)")
                    den.append(f"({x[i]})")

        numjoin = "".join(num)
        denjoin = "".join(den)
        polys.append(numjoin + "/" + denjoin)

    return pd.DataFrame(polys,columns = ["L_i(x)"])