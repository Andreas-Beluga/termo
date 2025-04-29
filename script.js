const sacolao_de_palavras = ["TERMO", "CINCO", "LEGAL", "#####", "JOGAR", "PLUMA", "CARRO", "VIVER", "COMER", "PULAR", "DANÇA", "CANTO", "SOFRE", "PONTO", "LUISA", "KALEO", "LUCAS", "SENTO", "JUNTO", "GALOS", "PAULO", "TESTA", "TESTE", "TRIBO", "ZOADO", "QUILO", "URUBU", "MANGA", "HOMEM", "CELTA", "PORTA", "GELAR", "CORTE", "PORTE", "MULAS", "BULAS", "TUAS", "JUROS", "CUBOS", "POMBO", "COMBO", "BICHO", "ALEMÃ"];
let palavra_secreta_da_vez = pega_palavra_aleatoria();
let linha_atual = 0;

const tabuleiro_de_letrinhas = document.getElementById("game-board");
const caixa_de_digitar = document.getElementById("input-box");
const botao_de_enviar = document.getElementById("submit-button");
const texto_de_aviso = document.getElementById("feedback");


function pega_palavra_aleatoria() {
  return sacolao_de_palavras[Math.floor(Math.random() * sacolao_de_palavras.length)];
}


function comeca_tudo_de_novo() {
  linha_atual = 0;
  texto_de_aviso.textContent = "Nova rodada iniciada!";
  palavra_secreta_da_vez = pega_palavra_aleatoria();
  caixa_de_digitar.value = "";


  Array.from(tabuleiro_de_letrinhas.children).forEach(celula => {
    celula.textContent = "";
    celula.className = ""; 
  });
}


for (let i = 0; i < 30; i++) {
  const quadradinho = document.createElement("div");
  tabuleiro_de_letrinhas.appendChild(quadradinho);
}

botao_de_enviar.addEventListener("click", () => {
  const chute = caixa_de_digitar.value.toUpperCase();
  if (chute.length !== 5) {
    texto_de_aviso.textContent = "A palavra precisa ter 5 letras!";
    return;
  }

  const inicio_da_linha = linha_atual * 5;
  for (let i = 0; i < 5; i++) {
    const quadradinho = tabuleiro_de_letrinhas.children[inicio_da_linha + i];
    quadradinho.textContent = chute[i];
    if (chute[i] === palavra_secreta_da_vez[i]) {
      quadradinho.classList.add("correct");
    } else if (palavra_secreta_da_vez.includes(chute[i])) {
      quadradinho.classList.add("present");
    } else {
      quadradinho.classList.add("absent");
    }
  }

  if (chute === palavra_secreta_da_vez) {
    texto_de_aviso.textContent = "Parabéns! Você acertou!";
    setTimeout(comeca_tudo_de_novo, 30000); 
    return;
  } else if (linha_atual === 5) {
    texto_de_aviso.textContent = `Fim de jogo! A palavra era ${palavra_secreta_da_vez}.`;
    botao_de_enviar.disabled = true;
    return;
  }

  linha_atual++;
  caixa_de_digitar.value = "";
});
