function start(){

    document.getElementById('btn1').disabled = true;
    document.getElementById('seta0').style.display = "block";
    var i = 0;
    var posicao = 0;
    var width = 0;

    document.getElementById("myBar").style.backgroundColor = "green";
    var id = setInterval(time, 1000); 

    function time(){
        if (i == caminhos.length){
            clearInterval(id);
        }
        if(("ABCDGHIJKMN").includes(caminhos[i]) == true){
            document.getElementById("seta"+(posicao)).style.display = "none";
            document.getElementById("seta"+(posicao+1)).style.display = "block";
            if(caminhos[i] == "A" || caminhos[i] == "H"){
                document.getElementById("numero"+(posicao)).innerHTML = "$";
            }
            posicao += 1;

            width += 100/caminhos.length;
            document.getElementById("myBar").style.width = width + "%";
            document.getElementById("myBar").innerHTML = (i+1) + "/" + caminhos.length;
           
        }
        if(("EFL").includes(caminhos[i]) == true){
            document.getElementById("seta"+(posicao)).style.display = "none";
            document.getElementById("seta"+(posicao-1)).style.display = "block";
            if(caminhos[i] == "E" || caminhos[i] == "L"){
                document.getElementById("numero"+(posicao)).innerHTML = "X";
            }
            posicao -= 1;

            width += 100/caminhos.length;
            document.getElementById("myBar").style.width = width + "%";
            document.getElementById("myBar").innerHTML = (i+1) + "/" + caminhos.length;

        }
        if(caminhos[i] == "Z"){
            document.getElementById("myBar").style.width = "100%";
            document.getElementById("myBar").innerHTML = (i+1) + "/" + caminhos.length + " - Não são iguais!";
            document.getElementById("myBar").style.backgroundColor = "red";        
        }
        if(caminhos[i] == "O"){
            document.getElementById("myBar").style.width = "100%";
            document.getElementById("myBar").innerHTML = (i+1) + "/" + caminhos.length + " - São iguais!";
        }

        i++;
    }
}