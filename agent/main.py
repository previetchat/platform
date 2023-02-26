from flask import Flask, request
from Crypto.Util.number import getPrime, inverse, bytes_to_long, long_to_bytes
from utils import get_phi

app = Flask(__name__)

e = 0x10001

@app.route('/n', methods=['GET'])
def get_n():
    n = getPrime(1024)
    return hex(n)[2:]

@app.route('/encrypt', methods=['POST'])
def encrypt():
    data = request.get_json()
    if data is None:
        return 'Invalid data', 400
    
    if 'n' not in data or 'm' not in data:
        return 'Invalid data', 400
    
    p = data.get('p', None)
    q = data.get('q', None)


    
    n = bytes_to_long(bytes.fromhex(data['n']))
    if p is not None and q is not None:
        p = bytes_to_long(bytes.fromhex(p))
        q = bytes_to_long(bytes.fromhex(q))
        n = p * q

    m = bytes_to_long(data['m'].encode())
    c = pow(m, e, n)
    return hex(c)[2:]

@app.route('/decrypt', methods=['POST'])
def decrypt():
    data = request.get_json()

    if data is None:
        return 'Invalid data', 400
    
    if 'p' not in data or 'q' not in data or 'c' not in data:
        return 'Invalid data', 400
    
    p = bytes_to_long(bytes.fromhex(data['p']))
    q = bytes_to_long(bytes.fromhex(data['q']))
    n = p * q
    c = bytes_to_long(bytes.fromhex(data['c']))
    phi = get_phi(p, q)
    d = inverse(e, phi)
    m = pow(c, d, n)
    return long_to_bytes(m).decode()

if __name__ == '_main_':
    app.run(debug=True, host='0.0.0.0', port=4000)