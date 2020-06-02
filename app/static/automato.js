
function gerardicionario(){
    let erro = 0;

    if(verifica_alfabeto() == 1){
        erro = 1;
    }
    if(verifica_Estados() == 1){
        erro = 1;
    }
    if(verifica_EInicial() == 1){
        erro = 1;
    }
    if(verifica_EAceitacao() == 1){
        erro = 1;
    }
    if(EInicial_pertence_estados() == 1){
        erro = 1;
    }
    if(EAceitacao_pertence_estados() == 1){
        erro = 1;
    }
    if(Verifica_Automato() == 1){
        erro = 1;
    }
    if(erro == 0){
        geracao_de_dicionario();
        document.getElementById('btn2').disabled = false;
    }
}

function calculo(){
    if(Verifica_Dicionario() == 0){
        Calcula();
    }
}

//Verificações
function verifica_alfabeto(){

    if(/^(?!.*(.).*\1)[0-9]+$/.test(document.getElementById("alfabeto").value) == true){
        document.getElementById("log_alfabeto").innerHTML = "Validado";
        document.getElementById("log_alfabeto").style.color = "green";
        return 0;
    }else{
        document.getElementById("log_alfabeto").innerHTML = "Alfabeto apenas pode conter 0 e 1";
        document.getElementById("log_alfabeto").style.color = "#ff0000";
        return 1;
    }
}
function verifica_Estados(){

    if(/^(?!.*(.).*\1)[A-Z]+$/.test(document.getElementById("Estados").value) == true){
        document.getElementById("log_estados").innerHTML = "Validado";
        document.getElementById("log_estados").style.color = "green";
        return 0;
    }else{
        document.getElementById("log_estados").innerHTML = "Estados apenas podem conter letras maiúsculas";
        document.getElementById("log_estados").style.color = "#ff0000";
        return 1;
    }

}
function verifica_EInicial(){

    if(/^([A-Z]{1})$/.test(document.getElementById("EInicial").value) == true){
        document.getElementById("log_estado_inicial").innerHTML = "Validado";
        document.getElementById("log_estado_inicial").style.color = "green";
        return 0;
    }else{
        document.getElementById("log_estado_inicial").innerHTML = "Estado Inicial apenas pode conter uma letra maiúscula";
        document.getElementById("log_estado_inicial").style.color = "#ff0000";
        return 1;
    }
}
function verifica_EAceitacao(){

    if(/^(?!.*(.).*\1)[A-Z]+$/.test(document.getElementById("EAceitacao").value) == true){
        document.getElementById("log_estados_aceites").innerHTML = "Validado";
        document.getElementById("log_estados_aceites").style.color = "green";
        return 0;
    }else{
        document.getElementById("log_estados_aceites").innerHTML = "Estados de aceitação apenas podem conter letras maiúsculas";
        document.getElementById("log_estados_aceites").style.color = "#ff0000";
        return 1;
    }
}
function Verifica_Automato(){

    input_automato = document.getElementById("Automato").value;
    input_alfabeto = document.getElementById("alfabeto").value;
    let erro = 0;

    for(i=0; i<input_automato.length; i++){
        if (input_alfabeto.includes(input_automato.charAt(i)) == false){
            erro = 1;
        }
    }
    if (erro == 0){
        document.getElementById("log_caminho").innerHTML = "Validado";
        document.getElementById("log_caminho").style.color = "green";
        return 0;
    }else{
        document.getElementById("log_caminho").innerHTML = "Automato tem de conter apenas os valores do alfabeto";
        document.getElementById("log_caminho").style.color = "#ff0000";
        return 1;
    }
}
function EInicial_pertence_estados(){

        if(document.getElementById("Estados").value.includes(document.getElementById("EInicial").value) == true){
            document.getElementById("log_estado_inicial_pertence_aos_estados").innerHTML = "Validado";
            document.getElementById("log_estado_inicial_pertence_aos_estados").style.color = "green";
            return 0;
        }else{
            document.getElementById("log_estado_inicial_pertence_aos_estados").innerHTML = "Estado inicial tem de pertencer à lista de estados";
            document.getElementById("log_estado_inicial_pertence_aos_estados").style.color = "#ff0000";
            return 1;
        }
}
function EAceitacao_pertence_estados(){
    var input_eaceitacao, input_estados;
    var erro = false;

    input_eaceitacao = document.getElementById("EAceitacao").value;
    input_estados = document.getElementById("Estados").value;
    
    for(i=0; i<input_eaceitacao.length; i++){
        if (input_estados.includes(input_eaceitacao.charAt(i)) == false){
            erro = true;
        }
    }

    if(erro == false){
        document.getElementById("log_estados_aceitacao_pertencem_aos_estados").innerHTML = "Validado";
        document.getElementById("log_estados_aceitacao_pertencem_aos_estados").style.color = "green";
        return 0;
    }else{
        document.getElementById("log_estados_aceitacao_pertencem_aos_estados").innerHTML = "Estados de aceitação têm de pertencer à lista de estados";
        document.getElementById("log_estados_aceitacao_pertencem_aos_estados").style.color = "#ff0000";
        return 1;
    }
}
function geracao_de_dicionario(){
    var caixa_rotas = document.getElementById("rotas");
    while (caixa_rotas.hasChildNodes()) {
        caixa_rotas.removeChild(caixa_rotas.lastChild);
    }
    for(i = 0, n = 0; n < document.getElementById("Estados").value.length; n++){
        for(m = 0; m < document.getElementById("alfabeto").value.length; m++, i++){
            caixa_rotas.appendChild(document.createTextNode(document.getElementById("Estados").value.charAt(n) + document.getElementById("alfabeto").value.charAt(m)));
            var input = document.createElement("input");
            input.type = "text";
            input.id = "cont" + (i+1);
            input.size="1";
            input.maxLength="1";
            input.style="width: 100px;height: 40px; font-size: 15px;"
            caixa_rotas.appendChild(input);

            var aviso = document.createElement("span");
            aviso.id = "aviso" + (i+1);
            caixa_rotas.appendChild(aviso);

            caixa_rotas.appendChild(document.createElement("br"));
        }
    }
}
//  ----------

function Verifica_Dicionario(){

    input_estados = document.getElementById("Estados").value;
    let erro = 0;

    for(i = 0, n = 0; n < document.getElementById("Estados").value.length; n++){
        for(m = 0; m < document.getElementById("alfabeto").value.length; m++, i++){
            
            input_rotas = document.getElementById("cont" + (i+1)).value;
            
            ver = input_estados.includes(input_rotas);
            if(ver == true){
                document.getElementById("aviso" + (i+1)).innerHTML = "Validado";
                document.getElementById("aviso" + (i+1)).style.color = "green";
            }else{
                document.getElementById("aviso" + (i+1)).innerHTML = "Rota não válida";
                document.getElementById("aviso" + (i+1)).style.color = "#ff0000";
                erro = 1;
            }

        }
    }
    return erro;
}
function Transforma_estados_Dic(){
    
    var dic = [];

    for(i = 0, n = 0; n < document.getElementById("Estados").value.length; n++){
        for(m = 0; m < document.getElementById("alfabeto").value.length; m++, i++){
            dic.push({
                atual: document.getElementById("Estados").value.charAt(n),
                caminho: document.getElementById("alfabeto").value.charAt(m),
                proximo: document.getElementById("cont" + (i+1)).value
                
                });
        }
    }
    return dic;
}
function Calcula(){
    DIC = Transforma_estados_Dic();
    var proximo;
    let estado_atual = document.getElementById("EInicial").value;
    const fim = document.getElementById("EAceitacao").value;

    for(let a = 0 ; a < document.getElementById("Automato").value.length; a++){
        for(let b = 0; b < DIC.length ;b++){
            if(estado_atual == DIC[b].atual){
                if(document.getElementById("Automato").value.charAt(a) == DIC[b].caminho){
                    proximo = DIC[b].proximo;
                }
            }
        }
        estado_atual = proximo;
    }

    var myWindow = window.open("", "", "width=300,height=300");
    if(fim.includes(estado_atual) == true){
        myWindow.document.write("<p>Sequência Válida</p>");
    }else{
        myWindow.document.write("<p>Sequência Rejeitada</p>");
    }
}
