##     ## ######## ##     ## ########  #### ##    ##  ######   
###   ###    ##    ##     ## ##     ##  ##  ###   ## ##    ##  
#### ####    ##    ##     ## ##     ##  ##  ####  ## ##        
## ### ##    ##    ##     ## ########   ##  ## ## ## ##   #### 
##     ##    ##    ##     ## ##   ##    ##  ##  #### ##    ##  
##     ##    ##    ##     ## ##    ##   ##  ##   ### ##    ##  
##     ##    ##     #######  ##     ## #### ##    ##  ######   

import re
import sys

# Cria o ficheiro template
def cria_template():
    f = open("generico.txt", "x")
    f.writelines("Estado Inicial\n\n")
    f.writelines("Estado de Aceitacao\n\n")
    f.writelines("Simbolo vazio da fita\n\n")
    f.writelines("Dicionario de transicoes\n")
    f.writelines("F - Estado atual\n")
    f.writelines("T - Estado da transicao\n")
    f.writelines("R - Leitura\n")
    f.writelines("W - Escrever\n")
    f.writelines("M - Movimento\n")
    f.writelines("(ex: F T RWM)\n")
    f.close()

# Class que vai conter o objeto com toda a informação
class Turing:
    def __init__(self, Inicial, Aceitacao, Vazio):
        self.Inicial = Inicial
        self.Aceitacao = Aceitacao
        self.Vazio = Vazio

    def __str__(self):
        return "E.Inicial: %s\nE.Aceitacao: %s\nVazio: %s\n" %(self.Inicial, self.Aceitacao, self.Vazio)

    def Verifica(self):
        # Verifica se o estado inicial está correto
        if re.match(r"^([A-Z]{1})$", self.Inicial) == None:
            return ("Erro na leitura do estado inicial, apenas pode conter uma letra maiuscula")

        # Verifica se o estado de aceitação está correto
        if re.match(r"^(?!.*(.).*\1)[A-Z]+$", self.Aceitacao) == None:
            return ("Erro na leitura do estado de Aceitacao, apenas podem ser usadas letras maiusculas e unicas")

        # Verifica se o espaço vazio da fita esta correto
        if re.match(r"^.$", self.Vazio) == None:
            return ("Erro na leitura do espaço vazio, apenas pode ter 1 caracter")

        return False

# Cria ficheiro com os dados introduzidos manualmente
def cria_ficheiro(Mturing, dict_trans, caminho = 0, historico = 0):
    resposta = input("Introduza o nome do ficheiro a criar: ")
    if re.match(r"^\w{1,}[.]txt$", resposta) == None:
        resposta += ".txt"
    
    try:
        f = open(resposta, "x")
        f.writelines("Estado Inicial\n")
        f.writelines(Mturing.Inicial)
        f.writelines("\nEstado de Aceitacao\n")
        f.writelines(Mturing.Aceitacao)
        f.writelines("\nSimbolo vazio da fita\n")
        f.writelines(Mturing.Vazio)
        f.writelines("\nDicionario de transicoes\n")
        f.writelines("F - Estado atual\n")
        f.writelines("T - Estado da transicao\n")
        f.writelines("R - Leitura\n")
        f.writelines("W - Escrever\n")
        f.writelines("M - Movimento\n")
        f.writelines("(ex: F T RWM)\n")
        for a, b in dict_trans.items():
            f.writelines(f'{a[0]} {b[0]} {a[1]}{b[1]}{b[2]}\n')
        if caminho:
            f.writelines("\n\nTransicoes\n")
            for linha in caminho:
                f.writelines(linha)
            f.writelines("\n\nMovimentos\n")
            for linha in historico:
                f.writelines(linha)
        f.close()
        return("Ficheiro criado com Sucesso")
    except:
        return("Erro na criação do ficheiro")

def wiki():
    print("\n\033[1;93mBem Vindo ao wiki\033[0m")
    print("Este programa calcula máquinas de turing\n")
    print("Tem 2 possíveis inputs")
    print("- Leitura de um ficheiro (Cria um template para que o utilizador possa escrever nele)")
    print("- Intrudução diretamente no programa(É possível criar um ficheiro depois de introduzir os dados)\n")
    print("\nO programa retorna a sequencia final e se chegou ao fim corretamente")
    print("tendo a possibilidade de escrever num ficheiro todos os movimentos da máquina")
    sys.exit("Programa feito por David Capitao e Diogo Martins\n")

################################################

# Imprime a mensagem Inicial
print("\n\033[1;34mBem Vindo à Máquina de Turing\033[0m\n")
print("Se for a primeira vez que está a usar o programa recomendamos que escreva 'wiki' no terminal\n")

# Cria o nosso objeto vazio
Mturing = Turing("","","")

# Inicialização do dicionário de transições
dict_Trans = {}

# Pergunta se o Utilizador tem um ficheiro. só sao se a resposta for sim ou não
resposta = input("Tem o seu ficheiro(sim/nao/wiki): ")
while resposta != "sim" and resposta != "nao"and resposta !="wiki":
    resposta = input("Comando não reconhecido\nTem o seu ficheiro(sim/nao): ")

if resposta == "wiki":
    wiki()

# Se não tiver ficheiro
if resposta == "nao":

    # Pergunta se o utilizador quer criar um template txt, só sai se a resposta for sim ou nao
    resposta = input("Quer criar um template para editar?(sim/nao): ")
    while resposta != "sim" and resposta != "nao":
        resposta = input("Comando não reconhecido\nQuer criar um template para editar?(sim/nao): ")

    # Se a resposta for sim vamos criar o template file
    if resposta == "sim":
        # Usamos a função try porque vamos criar o ficheiro em modo x fazendo que se o utilizador tiver um ficheiro com o mesmo nome vai dar erro (para não apagar o ficheiro original)
        # O programa sai sempre que o ficheiro é criado ou (falhou a criação) visto que o utilizador não tem os dados para a máquna
        try: 
            cria_template()
        except:
            sys.exit("Falha na criação de o ficheiro template, verifique se não tem nenhum ficheiro 'generico.txt'")
        finally:
            sys.exit("Template criado com sucesso 'generico.txt'")

        # Se o utilizador não tiver um ficheiro e quiser introduzir manualmente
    else:
        # Introdução dos dados da máquina de Turing
        Mturing.Inicial = input("Introduza o estado inicial: ")
        Mturing.Aceitacao = input("Introduza o(s) estado(s) de aceitacao: ")
        Mturing.Vazio = input("Introduza o caracter que define a fita vazia: ")

        # Introdução da sequencia
        resposta = ""
        print("\nVamos inicial a introdução do dicionário")
        print("Tem de ser no seguinte formato:\033[92mF T RWM\033[0m")
        print("F - Estado atual")
        print("T - Estado da transicao")
        print("R - Leitura")
        print("W - Escrever")
        print("M - Movimento")
        print("para sair basta escrever 'fim'")
        # Loop infinito até o utilizador escrever fim
        while resposta != "fim":
            resposta = input("Nova entrada:")
            if resposta != "fim":
                try:
                    # Cria no dicionário de transições a nova entrada
                    dict_Trans[(resposta[0], resposta[4])] = (resposta[2], resposta[5], resposta[6])
                except:
                    print("Fomatação inválida")
        
        # Perguntar se o utilizador quer criar o ficheiro com os dados introduzidos
        resposta = input("Quer criar um ficheiro com a informação introduzida?(sim/nao): ")
        while resposta != "sim" and resposta != "nao":
            resposta = input("Quer criar um ficheiro com a informação introduzida?(sim/nao): ")
        
        # Se sim, cria o ficheiro
        if resposta == "sim":
            print(cria_ficheiro(Mturing, dict_Trans))


# Se o utilizador tiver um ficheiro
else:
    # Vamos perguntar qual o nome do ficheiro e abri-lo, separando os dados numa lista. Se der erro o programa sai
    try:
        nome_ficheiro = input("Escreva o nome do seu ficheiro: ")
        f = open(nome_ficheiro, "r")
        dados = f.read()
        lista_dados = dados.split('\n')
        f.close()
    except:
        sys.exit("Erro na abertura do ficheiro!\nPossivelmente não encontrado")

    # Vamos guardar os dados lidos do ficheiro nas variaveis do programa, começando pelas variáveis da máquia de Turing
    try:
        Mturing.Inicial = lista_dados[1]
        Mturing.Aceitacao = lista_dados[3]
        Mturing.Vazio = lista_dados[5]

        # Guardar todas as transições no dicionário de transições
        for elemento in lista_dados[13:]:
            if elemento != "":
                dict_Trans[(elemento[0], elemento[4])] = (elemento[2], elemento[5], elemento[6])
        print("Ficheiro lido com sucesso")
    except:
        sys.exit("Erro na leitura dos dados do ficheiro, se o problema persistir use o template")

# Verifica se as entradas da Máquina de Turing são válidas
error = Mturing.Verifica()
if error:
    sys.exit(error)

# introdução da Sequencia por parte do utilizador
resposta = input("Defina a sua sequencia: ")
sequencia = list(resposta)

'''
print(Mturing)
print(dict_Trans)
print(sequencia)
'''
# Máquina de Turing

# Inicialização das variáveis
i = 0
stop = False
estado = Mturing.Inicial
autostop = 1000
movimentos = []
historico = []


# Ciclo que só acaba quando a máquina de Turing não encontrar um caminho a seguir do estado atual
# Autostop existe para não haver loops infinitos
while stop == False and autostop > 0:
    autostop -= 1
    # Procura se o estado atual e o lido da sequencia estão no dicionário de caminhos. Se não tiver, sai
    if (estado, sequencia[i]) in dict_Trans:
        # Guarda a informação do dicionário retornada para o caso atual
        resultado = dict_Trans[(estado, sequencia[i])]
        # Escrita do movimento
        movimentos += f"Estado: {estado} -> {resultado[0]} , Alteracao: {sequencia[i]} -> {resultado[1]}, Movimento: {resultado[2]}\n"

        # Guarda tudo o que acontece com os movimentos   
        for n in sequencia:
            historico += n
        historico += "\n"

        n = 0
        while n < i:
            historico += " "
            n += 1
        historico += "^"
        n += 1
        while n < len(sequencia):
            historico += " "
            n += 1
        historico += "\n"



        # Guarda o novo estado
        estado = resultado[0]
        # Altera o valor atual da sequencia com o novo valor do dicionário
        sequencia[i] = resultado[1]
        # Verifica se a cabeça da Máquina de Turing move para a esquerda, direita e fica parada
        if resultado[2] == 'R':
            # Se for para a direita vamos verificar se está no fim da sequencia, se sim, entao vamos acrescentar um espaço vazio no fim
            if i == len(sequencia)-1:
                sequencia += Mturing.Vazio 
                sequencia += Mturing.Vazio    
            i += 1
        elif resultado[2] == 'L':
            # Se for para a esquerda vamos verificar se está no inicio da sequencia, se sim, entao vamos acrescentar um espaço vazio no inicio.
            # Neste caso, como vamos acrescentar, não temos de alterar a variável porque toda a nossa lista movimentou-se para a direita em relação à sua posição inicial
            if i == 0:
                lista = [Mturing.Vazio] 
                lista += sequencia
                sequencia = lista
            else:
                i -= 1
        
    else:
        stop = True

if estado in Mturing.Aceitacao:
    print('\033[1;92mMáquina de Turing chegou ao fim com sucesso\033[0m')
else:
    print('\033[1;91mMáquina de Turing chegou ao fim sem sucesso\033[0m')

if autostop <= 0:
    print('\033[1;93mMáquina de Turing chegou ao limite de iterações\033[0m')

print(f'Sequência Final (Sem tratamento): {sequencia}')
while True:
    if Mturing.Vazio in sequencia:
        sequencia.remove(Mturing.Vazio)
    else:
        break
print(f'Sequência Final (tratada): {sequencia}')



resposta = input("Deseja criar um ficheiro com a informação da Máquina?(sim/nao): ")
while resposta != "sim" and resposta != "nao":
    resposta = input("Deseja criar um ficheiro com a informação da Máquina?(sim/nao): ")

if resposta == "sim":
    print(cria_ficheiro(Mturing, dict_Trans, movimentos, historico))