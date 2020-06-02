from app import app
from flask import render_template, request, redirect, url_for
from app.funcoes import webscraping, steamplayers, noticias_minuto, covid
import datetime

dict_registos={}
dict_registos['Diogo'] = 'Asdf.100'
next_update = [datetime.datetime(2020,5,10), 0, 0, 0, 0]
print('ola')

@app.route('/')
@app.route('/inicio')
def inicio():     
    if datetime.datetime.now() > next_update[0]:
        next_update[0] = datetime.datetime.now() + datetime.timedelta(minutes=15)
        update = True
    else:
        update = False


    if update == True:
        next_update[1] = covid()
        next_update[2] = noticias_minuto()
        next_update[3] = webscraping()
        next_update[4] = steamplayers()  

    tempo = [next_update[0], datetime.datetime.now()]
    tempo = [tempo[0].strftime("%HH %MM %SS"), tempo[1].strftime("%HH %MM %SS")]
    
    return render_template('inicio.html', title='Início', autenticacao = 'off', temperatura = next_update[3], steam = next_update[4], cov19 = next_update[1], noticias = next_update[2], tempo = tempo) 

@app.route('/teste')
def teste():
    return render_template('teste_2.html', title='Página Teste')

@app.route('/registo', methods=['GET', 'POST'])
def registo():
    lista_users = list (dict_registos.keys())
    if request.method != 'POST':
        return render_template('registo.html', registos = lista_users)
    else:
        dict_registos[request.form['uname']] = request.form['psw']
        return redirect(url_for('inicio'))
   

@app.route('/login', methods=['GET', 'POST'])
def login():
    username = request.form['uname']
    psw = request.form['psw']
    tempo = [next_update[0], datetime.datetime.now()]
    tempo = [tempo[0].strftime("%HH %MM %SS"), tempo[1].strftime("%HH %MM %SS")]
    if (dict_registos.get(username, 0) != 0):
        if (dict_registos.get(username) == psw):
            ## Resultado 1 significa que existe o username
            return render_template('inicio.html', title='Início', resultado = 1, autenticacao = "on", username = username, temperatura = next_update[3], steam = next_update[4], cov19 = next_update[1], noticias = next_update[2], tempo = tempo)
        else:
            ## Resultado 0 significa que não existe o username
            return render_template('inicio.html', title='Início', resultado = 0, autenticacao = "off", temperatura = next_update[3], steam = next_update[4], cov19 = next_update[1], noticias = next_update[2], tempo = tempo)
    else:
        ## Resultado 0 significa que não existe o username
        return render_template('inicio.html', title='Início', resultado = 0, autenticacao = "off", temperatura = next_update[3], steam = next_update[4], cov19 = next_update[1], noticias = next_update[2], tempo = tempo)

@app.route('/logout')
def logout():
    tempo = [next_update[0], datetime.datetime.now()]
    tempo = [tempo[0].strftime("%HH %MM %SS"), tempo[1].strftime("%HH %MM %SS")]
    return render_template('inicio.html', title='Início', resultado = 1, autenticacao = "off", temperatura = next_update[3], steam = next_update[4], cov19 = next_update[1], noticias = next_update[2], tempo = tempo)


@app.route('/automato_finito', methods=['GET', 'POST'])
def automato_finito():
    if request.method != 'POST':
        resultado_a = -1          ## RESULTADO PARA AS SEQUÊNCIAS QUE COMEÇAM E TERMINAM COM O MESMO SIMBOLO
        resultado_b = -1          ## RESULTADO PARA AS SEQUÊNCIAS QUE TÊM UM NÚMERO DE 0'S MULTIPLOS DE 3
        return render_template("automato_finito.html", title='Autómatos Finitos', resultado_a=resultado_a, resultado_b=resultado_b, autenticacao='off')
    
    if request.form['sequencia'] == '':
        resultado_a = -2          ## RESULTADO PARA AS SEQUÊNCIAS QUE COMEÇAM E TERMINAM COM O MESMO SIMBOLO
        resultado_b = -2          ## RESULTADO PARA AS SEQUÊNCIAS QUE TÊM UM NÚMERO DE 0'S MULTIPLOS DE 3
        return render_template("automato_finito.html", title='Autómatos Finitos', resultado_a=resultado_a, resultado_b=resultado_b, autenticacao='off')
    else:
        ## SEQUÊNCIAS QUE COMEÇAM E TERMINAM COM O MESMO SIMBOLO
        resultado_a = -1
        estado_inicial_a = 'A'
        estado_aceitacao_a = {'B', 'D'}

        resultado_b = -1
        estado_inicial_b = 'A'
        estado_aceitacao_b = {'A'}

        dic_Trans_a = {('A','0'):'D', ('A','1'):'B', ('B','0'):'C', ('B','1'):'B', ('C','0'):'C', 
                    ('C','1'):'B', ('D','0'):'D', ('D','1'):'E', ('E','0'):'D', ('E','1'):'E'}
                    
        dic_Trans_b = {('A','0'):'B', ('A','1'):'A', ('B','0'):'C', ('B','1'):'B', ('C','0'):'A', ('C','1'):'C'}
        
        
        estado_a = estado_inicial_a
        estado_b = estado_inicial_b
        sequencia = request.form['sequencia']

        for simbolo in sequencia:
            estado_a = dic_Trans_a[(estado_a, simbolo)]
            estado_b = dic_Trans_b[(estado_b, simbolo)]
        else:
            if estado_a in estado_aceitacao_a:
                resultado_a = 0               # É aceite
            else:
                resultado_a = 1               # Não é aceite

            if estado_b in estado_aceitacao_b:
                resultado_b = 0               # É aceite
            else:
                resultado_b = 1               # Não é aceite

        return render_template("automato_finito.html", title='Autómatos Finitos', resultado_a=resultado_a, resultado_b=resultado_b, sequencia=sequencia, autenticacao='off')

@app.route('/automato_finito_generico')
def automato_finito_generico():
    return render_template('automato_finito_generico.html', title='Autómato Finito Generico', autenticacao = "off")

@app.route('/maquina_turing', methods=['GET'])
def maquina_turing():
    if  (request.args.get('seq1','') == "") or (request.args.get('seq2','') == ""):
        lista = []
        sequencia = []
        return render_template('maquina_turing.html', lista = lista, sequencia = sequencia, title='Máquina de Turing', autenticacao = "off")
    else:
        d_trans = {('start','1'):('A','have1','$',1), 
           ('have1','0'):('B','have1','0',1), 
           ('have1','1'):('B','have1','1',1),
           ('have1','#'):('C','match1','#',1), 
           ('match1','X'):('D','match1','X',1), 
           ('match1','1'):('E','back','X',-1),
           ('back','#'):('F','back','#',-1),
           ('back','0'):('F','back','0',-1),
           ('back','1'):('F','back','1',-1),
           ('back','X'):('F','back','X',-1),
           ('back','$'):('G','start','$',1),
           ('start','0'):('H','have0','$',1), 
           ('have0','0'):('I','have0','0',1), 
           ('have0','1'):('I','have0','1',1),
           ('have0','#'):('J','match0','#',1), 
           ('match0','X'):('K','match0','X',1), 
           ('match0','0'):('L','back','X',-1),
           ('start','#'):('M','check','#',1),
           ('check','X'):('N','check','X',1),
           ('check','$'):('O','accept','$',0)}

        i = 0
        estado = "start"
        lista = ['W']
        seq1 = request.args.get('seq1','')
        seq2 = request.args.get('seq2','')
        receber = seq1 + '#' + seq2

        sequencia = list(receber)
        sequencia2 = list(receber)
        sequencia += "$"
        sequencia2 += "$"

        while lista[-1] != "Z" and lista[-1] != "O":
            if (estado, sequencia[i]) in d_trans:
                resultado = d_trans[(estado, sequencia[i])]
                lista += resultado[0]
                estado = resultado[1]
                sequencia[i] = resultado[2]
                i += resultado[3]
            else: 
                estado = 'BUST'
                lista += 'Z'

        lista = lista[1:]
        return render_template('maquina_turing.html', lista = lista, sequencia = sequencia2, title='Máquina de Turing', autenticacao = "off")

@app.route('/maquina_turing_generico')
def maquina_turing_generico():
    return render_template('maquina_turing_generico.html', title='Máquina Turing Generico', autenticacao = "off")