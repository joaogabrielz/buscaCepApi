const cep = document.getElementById("cep");
const pesquisar = document.getElementById("pesquisar");
const limpar = document.getElementById("limpar");

let temDado = false;

const validaCep = (cep) => {
    return cep.length == 8 && /^[0-9]+$/.test(cep) 
    //Exp. Reg. verifica se caracteres sao numéricos(0 a 9) retorna boolean
}
const preencheDados = async (end) =>{

if(!temDado){
    //Cria div pai
    const div_resp = document.createElement("div");
    div_resp.setAttribute("class", "container");
    div_resp.setAttribute("id", "div_resp");

    //Cria Elemento h6 resposta
    const logradouro = document.createElement("p");
    logradouro.setAttribute("class", "respo");
    logradouro.setAttribute("id", "logradouro");
    logradouro.innerHTML = "Rua: "+ end.logradouro;

    const bairro = document.createElement("p");
    bairro.setAttribute("class", "respo");
    bairro.setAttribute("id", "bairro");
    bairro.innerHTML = "Bairro: "+end.bairro;

    const localidade = document.createElement("p");
    localidade.setAttribute("class", "respo");
    localidade.setAttribute("id", "localidade");
    localidade.innerHTML = "Cidade: "+end.localidade +" ddd("+end.ddd +")";
   

    div_resp.appendChild(logradouro);
    div_resp.appendChild(bairro);
    div_resp.appendChild(localidade);

    document.body.appendChild(div_resp);

   temDado = true;
}
}
const buscaCEP = async () => {

    const cepV = cep.value;

    try{
        if( validaCep(cepV) ){
            const viacep_url = `https://viacep.com.br/ws/${cepV}/json/`;
            const cep_dados = await fetch(viacep_url);
            const cep_json = await cep_dados.json();

           // console.log(cep_json)
            if(cep_json.hasOwnProperty('erro')){
                throw{
                    "name":"ErroCEP",
                    "message":"Não foi possivel consultar o CEP"
                }
            }
            else{
                    await preencheDados(cep_json);
            }
        }
        else{
            throw{
                "name":"ErroCEP",
                "message":"CEP inválido ou Vazio"
            }          
        }

    }
    catch(err){
      //  console.log(err)
    if(!temDado){
       const cep_erro = document.createElement("h6")
        cep_erro.setAttribute('id',"cep_error");
        cep_erro.setAttribute("class", "cep_erro");
       cep_erro.innerHTML = err.message;

        document.body.appendChild(cep_erro);

    temDado = true;
      }       
    }
}
const limpaDados = () =>{
    const div_respE = document.getElementById('div_resp')
    const erroC = document.getElementById('cep_error')

    document.getElementById("cep").value = '';
   temDado = false;

    if(div_respE){
        document.body.removeChild(div_respE);
    }
    else{
        document.body.removeChild(erroC)
    }
}

cep.addEventListener('focus', limpaDados);
pesquisar.addEventListener('click', buscaCEP);
limpar.addEventListener("click", limpaDados);