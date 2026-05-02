const data = {
  produtos: [
    {
      id: 1,
      nome: "iPhone 13",
      preco: 3499.90,
      categoria: "Celulares",
      imagem: "https://via.placeholder.com/200x150?text=iPhone+13",
      descricao: "Smartphone Apple com ótimo desempenho e câmera de qualidade.",
      emEstoque: true
    },
    {
      id: 2,
      nome: "Samsung Galaxy S23",
      preco: 2999.90,
      categoria: "Celulares",
      imagem: "https://via.placeholder.com/200x150?text=Galaxy+S23",
      descricao: "Celular Samsung moderno, rápido e ideal para fotos e vídeos.",
      emEstoque: true
    },
    {
      id: 3,
      nome: "Notebook Acer Nitro",
      preco: 4299.90,
      categoria: "Notebooks",
      imagem: "https://via.placeholder.com/200x150?text=Acer+Nitro",
      descricao: "Notebook gamer com bom desempenho para jogos e estudos.",
      emEstoque: true
    },
    {
      id: 4,
      nome: "Notebook Lenovo Ideapad",
      preco: 2599.90,
      categoria: "Notebooks",
      imagem: "https://via.placeholder.com/200x150?text=Lenovo+Ideapad",
      descricao: "Notebook ideal para trabalho, faculdade e navegação.",
      emEstoque: false
    },
    {
      id: 5,
      nome: "Headset Gamer",
      preco: 199.90,
      categoria: "Acessórios",
      imagem: "https://via.placeholder.com/200x150?text=Headset",
      descricao: "Headset com microfone para jogos, aulas e chamadas.",
      emEstoque: true
    },
    {
      id: 6,
      nome: "Mouse Gamer RGB",
      preco: 89.90,
      categoria: "Acessórios",
      imagem: "https://via.placeholder.com/200x150?text=Mouse+RGB",
      descricao: "Mouse gamer com iluminação RGB e boa precisão.",
      emEstoque: true
    },
    {
      id: 7,
      nome: "Controle Xbox",
      preco: 399.90,
      categoria: "Games",
      imagem: "https://via.placeholder.com/200x150?text=Controle+Xbox",
      descricao: "Controle sem fio compatível com Xbox e computador.",
      emEstoque: true
    },
    {
      id: 8,
      nome: "PlayStation 5",
      preco: 3799.90,
      categoria: "Games",
      imagem: "https://via.placeholder.com/200x150?text=PlayStation+5",
      descricao: "Console de nova geração com alto desempenho.",
      emEstoque: false
    }
  ]
};

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

function formatPrice(preco) {
  return `R$ ${preco.toFixed(2)}`;
}

function createProductCard(produto) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", produto.id);

  card.style.padding = "15px";

  const imagem = document.createElement("img");
  imagem.setAttribute("src", produto.imagem);
  imagem.setAttribute("alt", produto.nome);

  const titulo = document.createElement("h3");
  titulo.classList.add("card-title");
  titulo.innerText = produto.nome;

  const preco = document.createElement("p");
  preco.innerText = formatPrice(produto.preco);

  const categoria = document.createElement("p");
  categoria.innerText = `Categoria: ${produto.categoria}`;

  const botaoDetalhes = document.createElement("button");
  botaoDetalhes.innerText = "Ver detalhes";

  botaoDetalhes.addEventListener("click", function () {
    showProductDetails(produto);
  });

  const botaoDestacar = document.createElement("button");
  botaoDestacar.innerText = "Destacar";

  botaoDestacar.addEventListener("click", function () {
    card.classList.add("highlight");
  });

  card.appendChild(imagem);
  card.appendChild(titulo);
  card.appendChild(preco);
  card.appendChild(categoria);
  card.appendChild(botaoDetalhes);
  card.appendChild(botaoDestacar);

  return card;
}

function renderProducts(produtos) {
  productList.innerHTML = "";

  produtos.forEach(function (produto) {
    const card = createProductCard(produto);
    productList.appendChild(card);
  });

  const cards = document.querySelectorAll(".card");

  cards.forEach(function (card) {
    console.log("Card renderizado - ID:", card.getAttribute("data-id"));
  });
}

function renderCategories() {
  categorySelect.innerHTML = "";

  const opcaoTodas = document.createElement("option");
  opcaoTodas.value = "Todas";
  opcaoTodas.innerText = "Todas";
  categorySelect.appendChild(opcaoTodas);

  const categorias = [];

  data.produtos.forEach(function (produto) {
    if (!categorias.includes(produto.categoria)) {
      categorias.push(produto.categoria);
    }
  });

  categorias.forEach(function (categoria) {
    const opcao = document.createElement("option");
    opcao.value = categoria;
    opcao.innerText = categoria;
    categorySelect.appendChild(opcao);
  });
}

function showProductDetails(produto) {
  productDetails.innerHTML = `
    <h2>${produto.nome}</h2>
    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
    <p><strong>Categoria:</strong> ${produto.categoria}</p>
    <p><strong>Status:</strong> ${produto.emEstoque ? "Em estoque" : "Fora de estoque"}</p>
    <p><strong>Descrição:</strong> ${produto.descricao}</p>
  `;
}

function filterProducts() {
  const textoBusca = searchInput.value.toLowerCase();
  const categoriaSelecionada = categorySelect.value;

  const produtosFiltrados = data.produtos.filter(function (produto) {
    const nomeCombina = produto.nome.toLowerCase().includes(textoBusca);

    const categoriaCombina =
      categoriaSelecionada === "Todas" ||
      produto.categoria === categoriaSelecionada;

    return nomeCombina && categoriaCombina;
  });

  return produtosFiltrados;
}

searchInput.addEventListener("input", function () {
  renderProducts(filterProducts());
});

categorySelect.addEventListener("change", function () {
  renderProducts(filterProducts());
});

btnRender.addEventListener("click", function () {
  renderProducts(filterProducts());
});

renderCategories();
renderProducts(data.produtos);