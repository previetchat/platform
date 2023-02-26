def get_phi(p, q):
    if p == 1 and q == 1:
        return 1
    
    if p == 1:
        return q - 1
    
    if q == 1:
        return p - 1
    
    if p == q:
        return p * (p - 1)
    
    return (p - 1) * (q - 1)