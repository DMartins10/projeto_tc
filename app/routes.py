from app import app

@app.route('/')
@app.route('/inicio')
def inicio():
    return "Hello World!!!"