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
        alert("O Dicionário de transições tem de ser escrito da seguinte forma:\nEstado Atual | Cabeça de Leitura | Estado Final | Escrita | Movimento (R,L,S)");
    }
}

function calculo(){
    if(Verifica_Dicionario() == 0){
        Calcula();
    }
}

//Verificações
function verifica_alfabeto(){

    if(/^(?!.*(.).*\1)[0-9$_x#]+$/.test(document.getElementById("alfabeto").value) == true){
        document.getElementById("log_alfabeto").innerHTML = "Validado";
        document.getElementById("log_alfabeto").style.color = "green";
        return 0;
    }else{
        document.getElementById("log_alfabeto").innerHTML = "Alfabeto apenas pode conter 0 a 9, x, _, $ e #";
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
    var informacao = document.getElementById('informacao')
    informacao.textContent = "Preenchimento da seguinte forma: Estado Atual | Cabeça de Leitura | Estado Final | Escrita | Movimento (R,L,S)"

    var caixa_rotas = document.getElementById("rotas");
    while (caixa_rotas.hasChildNodes()) {
        caixa_rotas.removeChild(caixa_rotas.lastChild);
    }
    for(i = 0, n = 0; n < document.getElementById("Estados").value.length; n++){
        for(m = 0; m < document.getElementById("alfabeto").value.length; m++, i++){
            caixa_rotas.appendChild(document.createTextNode(document.getElementById("Estados").value.charAt(n) + document.getElementById("alfabeto").value.charAt(m)));
            // Estado Final
            var input = document.createElement("input");
            input.type = "text";
            input.id = "cont_estado" + (i+1);
            input.size="1";
            input.maxLength="1";
            input.style="width: 60px;height: 40px; font-size: 15px;"
            caixa_rotas.appendChild(input);
            // Escrita
            var input = document.createElement("input");
            input.type = "text";
            input.id = "cont_escrita" + (i+1);
            input.size="1";
            input.maxLength="1";
            input.style="width: 60px;height: 40px; font-size: 15px;"
            caixa_rotas.appendChild(input);
            // Movimento
            var input = document.createElement("input");
            input.type = "text";
            input.id = "cont_movimento" + (i+1);
            input.size="1";
            input.maxLength="1";
            input.style="width: 60px;height: 40px; font-size: 15px;"
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
    input_alfabeto = document.getElementById("alfabeto").value;
    let erro = 0;

    for(i = 0, n = 0; n < document.getElementById("Estados").value.length; n++){
        for(m = 0; m < document.getElementById("alfabeto").value.length; m++, i++){
            
            input_rotas1 = document.getElementById("cont_estado" + (i+1)).value;
            input_rotas2 = document.getElementById("cont_escrita" + (i+1)).value;
            input_rotas3 = document.getElementById("cont_movimento" + (i+1)).value;      

            ver1 = input_estados.includes(input_rotas1);
            ver2 = input_alfabeto.includes(input_rotas2);
            ver3 = /^$|^([RLS]{1})$/.test(input_rotas3);

            input_rotas1 == input_rotas2 == input_rotas3

            if((ver1 == true && ver2 == true && ver3 == true)&&((input_rotas1 === "" && input_rotas2 === "" && input_rotas3 === "")||(input_rotas1 != "" && input_rotas2 != "" && input_rotas3 != ""))){
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
                final: document.getElementById("cont_estado" + (i+1)).value,
                le: document.getElementById("alfabeto").value.charAt(m),
                escreve: document.getElementById("cont_escrita" + (i+1)).value,
                movimento: document.getElementById("cont_movimento" + (i+1)).value 
                });
        }
    }
    return dic;
}
function Calcula(){
    DIC = Transforma_estados_Dic();

    //Apagar qualquer simulação antiga
    var tabela = document.getElementById("linha_imagens");
    while (tabela.hasChildNodes()) {
        tabela.removeChild(tabela.lastChild);
    }
    var tabela = document.getElementById("linha_sequencia");
    while (tabela.hasChildNodes()) {
        tabela.removeChild(tabela.lastChild);
    }



    let estado_atual =  document.getElementById("EInicial").value;
    
    let texto = "__".concat(document.getElementById("Automato").value).concat("____________________");
    
    // Transforma a string em array para podermos alterar caracteres especificos
    let sequencia = []
    for(i=0; i<texto.length; i++){
        sequencia[i] = texto.charAt(i)
        //Aproveitar que estamos a correr a sequencia para criar a animação
        celula = document.getElementById("linha_imagens").insertCell(-1);
        var image = document.createElement("img");
        image.setAttribute("src", "static/arrow.jpg");
        image.setAttribute("width", "40");
        image.setAttribute("height", "40");
        image.setAttribute("id", "seta" + (i));
        celula.appendChild(image);

        celula = document.getElementById("linha_sequencia").insertCell(-1);
        celula.id = "sequ" + (i);
        celula.innerHTML = texto.charAt(i);
    }
    
    let stop = false;
    let pos = 2; //Posição na Lista

    document.getElementById("seta" + pos).style.display = "block"; //Liga a seta inicial
    var id = setInterval(time, 1000);
    
    function time(){
        if (stop == true){
            clearInterval(id);
            if( estado_atual == document.getElementById("EAceitacao").value){
                alert('Sequência Aceite')
            }
        }
        let small_stop = false;
        for(let b = 0; b < DIC.length && stop == false && small_stop == false;b++){
            if(estado_atual == DIC[b].atual){
                if(sequencia[pos] == DIC[b].le){
                    if(DIC[b].movimento === ""){
                        stop = true;
                    }else{
                        small_stop = true;

                        estado_atual = DIC[b].final;
                        sequencia[pos] = DIC[b].escreve;
                        
                        //Animação
                        celula = document.getElementById("sequ" + pos);
                        celula.innerHTML = DIC[b].escreve;

                        if(DIC[b].movimento == "R"){
                            document.getElementById("seta"+pos).style.display = "none";
                            pos++;
                            document.getElementById("seta"+pos).style.display = "block";
                        }else{
                            if(DIC[b].movimento == "L"){
                            document.getElementById("seta"+pos).style.display = "none";
                            pos--;
                            document.getElementById("seta"+pos).style.display = "block";
                            }
                        }
                    }
                }
            }
        }
        if( estado_atual == document.getElementById("EAceitacao").value){
            stop = true;
        }
    }
}