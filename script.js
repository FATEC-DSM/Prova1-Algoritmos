// Nome dos Integrantes:
// Leonardo Saes Dias Franco    RA: 2161392323022
// Gabriel Freitas de Lima	    RA: 2161392323029
// Sérgio da Silva Dias Júnior 	RA: 2161392323019
// Maxwell do Alves dos Santos	RA: 2161392323018
// Matheus Rocha Martins		    RA: 2161392323035

// Descrição do problema escolhido:
// Escolhemos trabalhar um código que calcule os descontos do seu salário, um calculo de Holerite.

// Descrição breve do funcionamento do algoritmo:
// O algoritmo pede que o usuário preencha um formulário com as seguintes informações, seu salário bruto, gastos com condução, valor do vale refeição, horas extras trabalhadas, horas que voce faltou no serviço e a porcentagem que voce tem com o seguro de vida.
// Ao clicar no botão calcular será exibido seu salário bruto, o valor que voce recebe por hora trabalhada, o valor que recebeu de hora extra, o valor gasto em condução, o valor gasto em alimentação, o valor descontado do seu salário caso voce tenha faltado algumas horas o valor do seu seguro de vida e o desconto do INSS.
// Após isso será exibido a soma de todos os seus descontos e o salario liquido recebido no fim do mês. 

// variáveis de entrada e suas definições:
// salario, conducao, valeAlimentacao, horaExtra, faltas, seguroVida.
// Todas as variáveis de entrada guardam o valor preenchido pelo o usuário

// variáveis de saída e suas definições:
// descontoFaltas, descontoSeguroVida, valorHora, valorHoraExtra, porcentMaxDescontadoVT, precoTotalVT, valorMaxVT, porcentMaxDescontadoVR, precoTotalVR, valorMaxVR, valorMaxVTdescontoINSS, totalDescontos, salarioLiquido.
// A variavel porcentMaxDescontadoVT calcula a porcentagem de desconto do VT.
// A variavel precoTotalVT calcula o gasto mensal da pessoa com condução.
// A variavel valorMaxVT calcula precoTotalVT vezes o porcentMaxDescontadoVT.
// A variavel porcentMaxDescontadoVR calcula a porcentagem de desconto do VT.
// A variavel precoTotalVR calcula o gasto mensal da pessoa com alimentação.
// A variavel valorMaxVR calcula precoTotalVR vezes o porcentMaxDescontadoVR.
// A variavel descontoFaltas calcula o desconto no salario baseado no tanto de horas que a pessoa faltou.
// A variavel descontoSeguroVida calcula o desconto no salario baseado na porcentagem que a pessoa tem de seguro de vida.
// A variavel valorHora calcula o quanto a pessoa recebe por hora de trabalho (10 horas diárias de trabalho foi a base para o algoritmo).
// A variavel valorHoraExtra calcula o quanto a pessoa recebera de acréscimo no salario por hora trabalhada (cada hora extra trabalhada equivale a 1.5 vezes a mais a hora trabalhada comum).
// A variavel descontoINSS calcula o desconto no salario baseado no INSS da pessoa.
// A variavel totalDescontos é a soma de todos os descontos que a pessoa recebeu no seu salario.
// A variavel salarioLiquido é o valor que a pessoa recebe no final do mes apos todos os acréscimos e descontos no salario. 

function calcularHolerite() {

    const salario = parseFloat(document.getElementById('salario').value) || 0;
    const conducao = parseFloat(document.getElementById('conducao').value) || 0;
    const valeAlimentacao = parseFloat(document.getElementById('valeAlimentacao').value) || 0;
    const horaExtra = parseFloat(document.getElementById('horaExtra').value) || 0;
    const faltas = parseFloat(document.getElementById('faltas').value) || 0;
    const seguroVida = parseFloat(document.getElementById('seguroVida').value) || 0;

    const horasTrabalhadasNoMes = 220;
    const diasUteisMes = 22;

    const valorHora = salario / horasTrabalhadasNoMes;
    const descontoFaltas = (salario / horasTrabalhadasNoMes) * faltas;
    const descontoSeguroVida = (salario * seguroVida) / 100;
    const valorHoraExtra = (valorHora * 1.5) * horaExtra;

    const porcentMaxDescontadoVT = 0.06;
    const precoTotalVT = diasUteisMes * conducao;
    const valorMaxVT = precoTotalVT * porcentMaxDescontadoVT;
    
    const porcentMaxDescontadoVR = 0.2;
    const precoTotalVR = diasUteisMes * valeAlimentacao;
    const valorMaxVR = precoTotalVR * porcentMaxDescontadoVR;
    
    let descontoINSS = 0;
    if (salario <= 1320.0) {
        descontoINSS = (salario * 0.075).toFixed(2);
    } else if (salario <= 2571.29) {
        descontoINSS = (salario * 0.09).toFixed(2);
    } else if (salario <= 3856.94) {
        descontoINSS = (salario * 0.12).toFixed(2);
    } else if (salario <= 7507.49) {
        descontoINSS = (salario * 0.14).toFixed(2);
    } else {
        descontoINSS = (salario * 0.14).toFixed(2);
    }

    let impostoRenda = 0;
    if (salario < 2112){
        impostoRenda = 0;
    } else if (salario < 2826.65) {
        impostoRenda = salario * 0.075;
    } else if (salario < 3751.05) {
        impostoRenda = salario * 0.15;
    } else if (salario < 4664.68) {
        impostoRenda = salario * 0.225;
    } else if (salario > 4664.69) {
        impostoRenda = salario * 0.275
    } else {
        impostoRenda = salario;
    }

    const totalDescontos = valorMaxVT + valorMaxVR + descontoFaltas + descontoSeguroVida + parseFloat(descontoINSS) + parseFloat(impostoRenda);
    const salarioLiquido = salario + valorHoraExtra - totalDescontos;

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
        <span>Salário Bruto: R$ ${salario.toFixed(2)}</span>
        <br>
        <span>Valor da Hora: R$ ${valorHora.toFixed(2)}</span>
        <span>Valor da Hora Extra: R$ ${valorHoraExtra.toFixed(2)}</span>
        <span>Valor VT: R$ ${valorMaxVT.toFixed(2)}</span>
        <span>Valor VR: R$ ${valorMaxVR.toFixed(2)}</span>
        <span>Desconto Faltas: R$ ${descontoFaltas.toFixed(2)}</span>
        <span>Desconto Seguro de Vida: R$ ${descontoSeguroVida.toFixed(2)}</span>
        <span>Desconto INSS: R$ ${descontoINSS}</span>
        <span>Desconto IR: R$ ${impostoRenda}</span>
        <br>
        <span class="total">Total de Descontos: R$ ${totalDescontos.toFixed(2)}</span>
        <span class="total">Salário Líquido: R$ ${salarioLiquido.toFixed(2)}</span>
        
    `;
}
