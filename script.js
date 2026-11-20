// MENU HAMBURGER
const botaoMenu = document.querySelector(".botao-menu");
const menu = document.querySelector(".menu");

botaoMenu.addEventListener("click", function () {
  menu.classList.toggle("aberto");

  if (menu.classList.contains("aberto")) {
    botaoMenu.setAttribute("aria-expanded", "true");
    botaoMenu.setAttribute("aria-label", "Fechar menu");
  } else {
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
  }
});

const linksMenu = document.querySelectorAll(".menu a");

for (let i = 0; i < linksMenu.length; i++) {
  linksMenu[i].addEventListener("click", function () {
    menu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
  });
}

// SLIDESHOW DO BANNER
const imagensBanner = [
  "img/banner_img.png",
  "img/banner1.jpeg",
  "img/banner2.jpeg"
];

let imagemAtual = 0;
const bannerImagem = document.querySelector(".banner-imagem");
const botaoAnterior = document.querySelector(".seta-esquerda");
const botaoProximo = document.querySelector(".seta-direita");

function mostrarBanner() {
  bannerImagem.src = imagensBanner[imagemAtual];
}

botaoAnterior.addEventListener("click", function () {
  imagemAtual = imagemAtual - 1;

  if (imagemAtual < 0) {
    imagemAtual = imagensBanner.length - 1;
  }

  mostrarBanner();
});

botaoProximo.addEventListener("click", function () {
  imagemAtual = imagemAtual + 1;

  if (imagemAtual >= imagensBanner.length) {
    imagemAtual = 0;
  }

  mostrarBanner();
});

// CONFIGURADOR DO SEALION 7
const imagemCarro = document.getElementById("imagem-carro");
const nomeOpcao = document.getElementById("nome-opcao");
const opcoesCarro = document.getElementById("opcoes-carro");
const abasConfig = document.querySelectorAll(".aba-config");

const imagensCores = [
  { imagem: "img/sealion7-rosemary-grey-mob.jpeg", nome: "Rosemary Grey" },
  { imagem: "img/sealion7-cosmos-black-pc.jpeg", nome: "Cosmos Black" },
  { imagem: "img/sealion7-bright-white-mob.jpeg", nome: "Bright White" }
];

const imagensInterior = [
  { imagem: "img/sealion7-int-black-mob.jpeg", nome: "Interior preto" }
];

const imagensRodas = [
  { imagem: "img/sealion7-wheel.jpeg", nome: "Rodas do Sealion 7" }
];

let tipoAtual = "cores";
let indiceOpcao = 0;

function mostrarOpcoes(tipo) {
  let listaImagens = imagensCores;

  if (tipo === "interior") {
    listaImagens = imagensInterior;
  } else if (tipo === "rodas") {
    listaImagens = imagensRodas;
  }

  opcoesCarro.innerHTML = "";

  for (let i = 0; i < listaImagens.length; i++) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "opcao-cor";
    botao.textContent = listaImagens[i].nome;
    botao.style.width = "auto";
    botao.style.height = "auto";
    botao.style.padding = "8px 12px";
    botao.style.borderRadius = "4px";

    botao.addEventListener("click", function () {
      indiceOpcao = i;
      imagemCarro.src = listaImagens[i].imagem;
      nomeOpcao.textContent = listaImagens[i].nome;
    });

    opcoesCarro.appendChild(botao);
  }

  indiceOpcao = 0;
  imagemCarro.src = listaImagens[0].imagem;
  nomeOpcao.textContent = listaImagens[0].nome;
}

for (let i = 0; i < abasConfig.length; i++) {
  abasConfig[i].addEventListener("click", function () {
    for (let j = 0; j < abasConfig.length; j++) {
      abasConfig[j].classList.remove("ativa");
    }

    abasConfig[i].classList.add("ativa");
    tipoAtual = abasConfig[i].getAttribute("data-tipo");
    mostrarOpcoes(tipoAtual);
  });
}

const botoesCor = document.querySelectorAll(".opcao-cor");

for (let i = 0; i < botoesCor.length; i++) {
  botoesCor[i].addEventListener("click", function () {
    for (let j = 0; j < botoesCor.length; j++) {
      botoesCor[j].classList.remove("selecionada");
    }

    botoesCor[i].classList.add("selecionada");
    imagemCarro.src = botoesCor[i].getAttribute("data-imagem");
    nomeOpcao.textContent = botoesCor[i].getAttribute("data-nome");
  });
}

document.querySelector(".config-anterior").addEventListener("click", function () {
  const lista = tipoAtual === "interior" ? imagensInterior : tipoAtual === "rodas" ? imagensRodas : imagensCores;
  indiceOpcao = indiceOpcao - 1;

  if (indiceOpcao < 0) {
    indiceOpcao = lista.length - 1;
  }

  imagemCarro.src = lista[indiceOpcao].imagem;
  nomeOpcao.textContent = lista[indiceOpcao].nome;
});

document.querySelector(".config-proxima").addEventListener("click", function () {
  const lista = tipoAtual === "interior" ? imagensInterior : tipoAtual === "rodas" ? imagensRodas : imagensCores;
  indiceOpcao = indiceOpcao + 1;

  if (indiceOpcao >= lista.length) {
    indiceOpcao = 0;
  }

  imagemCarro.src = lista[indiceOpcao].imagem;
  nomeOpcao.textContent = lista[indiceOpcao].nome;
});

// LISTAS DEPENDENTES: ESTADO, CIDADE E CONCESSIONARIA
const cidadesPorEstado = {
  BA: ["Salvador", "Feira de Santana", "Lauro de Freitas"],
  SP: ["São Paulo", "Campinas", "Santos"],
  RJ: ["Rio de Janeiro", "Niterói", "Petrópolis"]
};

const concessionariasPorCidade = {
  "Salvador": ["BYD GNC Paralela", "BYD GNC Iguatemi"],
  "Feira de Santana": ["BYD Feira de Santana"],
  "Lauro de Freitas": ["BYD Lauro de Freitas"],
  "São Paulo": ["BYD São Paulo Norte", "BYD São Paulo Sul"],
  "Campinas": ["BYD Campinas"],
  "Santos": ["BYD Santos"],
  "Rio de Janeiro": ["BYD Rio de Janeiro Centro"],
  "Niterói": ["BYD Niterói"],
  "Petrópolis": ["BYD Petrópolis"]
};

const estado = document.getElementById("estado");
const cidade = document.getElementById("cidade");
const concessionaria = document.getElementById("concessionaria");

estado.addEventListener("change", function () {
  cidade.innerHTML = '<option value="">Selecione uma cidade</option>';
  concessionaria.innerHTML = '<option value="">Selecione primeiro a cidade</option>';
  concessionaria.disabled = true;

  const cidades = cidadesPorEstado[estado.value];

  if (cidades) {
    cidade.disabled = false;

    for (let i = 0; i < cidades.length; i++) {
      const opcao = document.createElement("option");
      opcao.value = cidades[i];
      opcao.textContent = cidades[i];
      cidade.appendChild(opcao);
    }
  } else {
    cidade.disabled = true;
  }
});

cidade.addEventListener("change", function () {
  concessionaria.innerHTML = '<option value="">Selecione uma concessionária</option>';

  const lojas = concessionariasPorCidade[cidade.value];

  if (lojas) {
    concessionaria.disabled = false;

    for (let i = 0; i < lojas.length; i++) {
      const opcao = document.createElement("option");
      opcao.value = lojas[i];
      opcao.textContent = lojas[i];
      concessionaria.appendChild(opcao);
    }
  } else {
    concessionaria.disabled = true;
  }
});
