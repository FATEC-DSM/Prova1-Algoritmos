const salarioBruto = document.querySelector("#salarioBruto");

const valorVT = document.querySelector("#vt");
const valorVR = document.querySelector("#vr");

const horaExtraCheckbox = document.querySelector("#horaExtraCheckbox");
const horaExtra = document.querySelector("#horaExtra");

const horaDescontoCheckbox = document.querySelector("#horaDescontoCheckbox");
const horaDescontada = document.querySelector("#horaDescontada");

const seguroCheckbox = document.querySelector("#seguroCheckbox");
const porcentSeguro = document.querySelector("#porcentSeguro");

const popUp = document.querySelector(".pop-up");


document.querySelector("form").addEventListener('submit', function (evento){
  evento.preventDefault();
})

// const nome = prompt("Qual o seu nome?")


function CALCULAR_HOLERITE() {

  const descontoSeguroVida = calcularSeguro(salarioBruto.value, porcentSeguro.value);

  const descontoIR = calculaIR(salarioBruto.value);

  const descontoVR = VR(valorVR.value);

  const descontoVT = VT(salarioBruto.value, valorVT.value);

  const descontoINSS = calculaINSS(salarioBruto.value);

  const horaExtraTrabalhada = calcularHoraExtra(salarioBruto.value, horaExtra.value);

  const valorDescontado = calcularDescontoFalta(salarioBruto.value, horaDescontada.value);

    // "descontoSeguroVida: " + descontoSeguroVida + '\n' +
    // "descontoIR: " + descontoIR + '\n' +
    // "descontoVR: " + descontoVR + '\n' +
    // "descontoVT: " + descontoVT + '\n' +
    // "descontoINSS: " + descontoINSS + '\n' +
    // "horaExtraTrabalhada: " + horaExtraTrabalhada + '\n' + 
    // "valorDescontado: " + valorDescontado


    const diferenca = salarioBruto.value - descontoSeguroVida;
    const diferenca2 = salarioBruto.value - descontoIR;

    const salarioLiquido = salarioBruto.value - (descontoVR + descontoVT + descontoINSS + diferenca + diferenca2);

    popUp.style.display = 'block';


    console.log(salarioLiquido);

    popUp.innerHTML = `
    <h3>Descontos do Holerite</h3>
    <span>Salário bruto: </span> ${salarioBruto.value}
    <span>Salário líquido: </span> ${salarioLiquido}
    `

}

function calcularSeguro(salario, porcentagemSeguro) {
  const desconto = salario * (porcentagemSeguro / 100);
  const salarioLiquido = salario - desconto;

  return salarioLiquido;
}

function calculaIR(salario) {
  if (salario < 2112) {
    return 0;

  } else if (salario < 2826.65) {
    return salario - salario * 0.075;

  } else if (salario < 3751.05) {
    return salario - salario * 0.15;

  } else if (salario < 4664.68) {
    return salario - salario * 22.5;

  } else if (salario > 4664.68) {
    return salario - salario * 27.5;

  } else {
    return salario;
  }
}

function VT(salario, valorVT) {
  const diasUteis = 22;

  const precoVTPorDia = valorVT;
  const valorNecessarioTransporte = diasUteis * precoVTPorDia;
  const valorMaximoDescontado = salario * 0.06;

  let ContribuicaoEmpresa = 0;

  if (valorNecessarioTransporte > valorMaximoDescontado) {
    ContribuicaoEmpresa = (
      valorNecessarioTransporte - valorMaximoDescontado
    ).toFixed(2);
  }

  return valorNecessarioTransporte;
}

// valor máximo que pode ser descontado é 20% do valor total do benefício
function VR(valorVR) {
  const porcentMaxDescontado = 0.2;
  const valorPorDia = valorVR;
  const precoTotal = 22 * valorPorDia;

  const valorMaxDescontado = precoTotal * porcentMaxDescontado;

  return valorMaxDescontado.toFixed(2);
}

// FUNÇÃO PARA CALCULAR O INSS DESCONTADO DO HOLERITE

function calculaINSS(salario) {
  if (salario <= 1320.0) {
    return (salario * 0.075).toFixed(2);

  } else if (salario <= 2571.29) {
    return (salario * 0.09).toFixed(2);

  } else if (salario <= 3856.94) {
    return (salario * 0.12).toFixed(2);

  } else if (salario <= 7507.49) {
    return (salario * 0.14).toFixed(2);

  } else {
    return (salario * 0.14).toFixed(2);
  }
}


function calcularHoraExtra(salarioBruto, horaExtra) { 

  const diasUteis = 22;
  const horasComumTrabalhadas = 8;
  
  const horasPadrao = 220; //por mês

  const salarioHora = (salarioBruto / diasUteis) / horasComumTrabalhadas; // 17 reais

  let salarioAcrescidoHoraExtra = 0; 

  // a hora extra é somado 50% a mais do que a hora normal, exemplo: ganhar 20 reais por hora, ele vai ganhar 50% a mais desse valor
  const adicionalExtra = (salarioHora * horaExtra) * 1.5;

  salarioAcrescidoHoraExtra = salarioHora * horasPadrao + adicionalExtra; 

  return adicionalExtra.toFixed(2);
}


function calcularDescontoFalta(salarioBruto, horaDescontada) {
  const diasUteis = 22;
  const horasPadrao = 220;
  const horasComumTrabalhadas = 8;

  const salarioHora = (salarioBruto / diasUteis) / horasComumTrabalhadas;
  
  const horasTrabalhadas = horasPadrao - horaDescontada     

  const salarioSemDesconto = salarioHora * horasPadrao;
  const salarioComDesconto = salarioHora * horasTrabalhadas;
  const valorDescontado = salarioSemDesconto - salarioComDesconto;

  // return [
  //   valorDescontado,
  //   salarioSemDesconto,
  //   salarioComDesconto
  // ]

  return valorDescontado;
  
}


horaExtraCheckbox.addEventListener('change', () => {
  if(horaExtraCheckbox.checked) {
    horaExtra.disabled = false; //habilitado

  } else {
    horaExtra.value = '';
    horaExtra.disabled = true; //desabilitado
  }
})

horaDescontoCheckbox.addEventListener('change', () => {
  if(horaDescontoCheckbox.checked) {
    horaDescontada.disabled = false; //habilitado

  } else {
    horaDescontada.disabled = true; //desabilitado
  }
})

seguroCheckbox.addEventListener('change', () => {
  if(seguroCheckbox.checked) {
    porcentSeguro.disabled = false; //habilitado

  } else {
    porcentSeguro.disabled = true; //desabilitado
  }
})