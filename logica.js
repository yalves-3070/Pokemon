
let pokebola = document.getElementById("pokebola");
let area = document.getElementById("area");
let estado = document.getElementById("estado");
let mensagem = document.getElementById("mensagem");
let contador = document.getElementById("contador");

let posY = 0;
let posX = 0;
let direcaoY = 1;
let direcaoX = 1;
let velocidade = 2;
let animacao;
let rodando = false;
let capturados = 0;

const imagens = [
    "./images/pokebola.png",
    "./images/charmander.gif",
    "./images/pokebola_blue.png",
    "./images/pikachu.gif",
    "./images/pokebola_open.png",
    "./images/squirtle.gif",
    "./images/mew.gif",
    "./images/pokevenon.gif",
    "./images/butterfree.gif",
    "./images/gengar.gif",
    "./images/raichu.gif",
    "./images/zapdos.gif",
    "./images/snorlax.gif",
    "./images/charizard.gif"
];

function atualizarEstado(texto, cor, frase) {
    estado.textContent = texto;
    document.querySelector(".led").style.background = cor;
    document.querySelector(".led").style.boxShadow = "0 0 10px " + cor;
    mensagem.textContent = frase;
}

function posicaoAleatoria() {
    let maxX = area.clientWidth - pokebola.offsetWidth;
    let maxY = area.clientHeight - pokebola.offsetHeight;

    posX = Math.random() * Math.max(0, maxX);
    posY = Math.random() * Math.max(0, maxY);

    pokebola.style.left = posX + "px";
    pokebola.style.top = posY + "px";
}

function moverImagem() {
    if (!rodando) return;

    let maxX = area.clientWidth - pokebola.offsetWidth;
    let maxY = area.clientHeight - pokebola.offsetHeight;

    posX += velocidade * direcaoX;
    posY += velocidade * direcaoY;

    if (posX >= maxX) {
        posX = maxX;
        direcaoX = -1;
    } else if (posX <= 0) {
        posX = 0;
        direcaoX = 1;
    }

    if (posY >= maxY) {
        posY = maxY;
        direcaoY = -1;
    } else if (posY <= 0) {
        posY = 0;
        direcaoY = 1;
    }

    pokebola.style.left = posX + "px";
    pokebola.style.top = posY + "px";

    animacao = requestAnimationFrame(moverImagem);
}

function iniciar() {
    if (rodando) return;

    rodando = true;
    posicaoAleatoria();

    atualizarEstado(
        "EM JOGO",
        "#35ed9b",
        "Um Pokémon selvagem apareceu! Tente capturá-lo!"
    );

    moverImagem();
}

function pausar() {
    rodando = false;
    cancelAnimationFrame(animacao);

    atualizarEstado(
        "PAUSADO",
        "#ffbd35",
        "Jogo pausado. Clique em INICIAR para continuar."
    );
}

function mudarImagem() {
    let atual = pokebola.src;
    let novaImagem;

    do {
        novaImagem = imagens[Math.floor(Math.random() * imagens.length)];
    } while (imagens.length > 1 && atual.endsWith(novaImagem.replace("./", "")));

    pokebola.src = novaImagem;
    posicaoAleatoria();

    atualizarEstado(
        rodando ? "EM JOGO" : "POKÉMON NOVO",
        "#b59aff",
        "Um novo Pokémon apareceu! Tente capturá-lo!"
    );
}

function capturar() {
    capturados++;
    contador.textContent = capturados;

    atualizarEstado(
        rodando ? "EM JOGO" : "CAPTURADO",
        "#35ed9b",
        "Pokémon capturado! Você já capturou " + capturados + "!"
    );

    mudarParaProximo();
}

function mudarParaProximo() {
    let atual = pokebola.src;
    let novaImagem;

    do {
        novaImagem = imagens[Math.floor(Math.random() * imagens.length)];
    } while (imagens.length > 1 && atual.endsWith(novaImagem.replace("./", "")));

    pokebola.src = novaImagem;
    posicaoAleatoria();
}

posicaoAleatoria();