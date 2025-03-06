// Função para adicionar uma nova lista
function adicionarLista() {
    const container = document.getElementById("lista-container");
    const novoCard = document.createElement("div");
    novoCard.className = "lista-card";
    novoCard.innerHTML = `
        <div class="header">
            <input type="text" name="nome_lista" placeholder="Nome da Lista">
            <div class="icons">
                <button class="edit-button" onclick="alternarEdicao(this)">✏️</button>
                <button class="delete-button" onclick="excluirLista(this)">❌</button>
            </div>
        </div>
        <textarea name="lista" placeholder="Insira os elementos separados por vírgula (ex: João, Maria, Pedro)"></textarea>
    `;
    container.appendChild(novoCard);
}

// Função para alternar entre modo de edição e modo de visualização
function alternarEdicao(botao) {
    const card = botao.closest(".lista-card");
    const inputs = card.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
        input.readOnly = !input.readOnly;
    });

    // Altera o ícone do botão
    botao.textContent = inputs[0].readOnly ? "✏️" : "✔️";
}

// Função para excluir uma lista
function excluirLista(botao) {
    const card = botao.closest(".lista-card");
    card.remove();
    salvarListas(); // Atualiza o localStorage após a exclusão
}

// Função para salvar as listas no localStorage
function salvarListas() {
    const cards = document.querySelectorAll(".lista-card");
    const listasSalvas = [];

    cards.forEach((card) => {
        const nome = card.querySelector('input[name="nome_lista"]').value;
        const valores = card.querySelector('textarea[name="lista"]').value;
        listasSalvas.push({ nome, valores });

        // Torna os campos não editáveis após salvar
        const inputs = card.querySelectorAll("input, textarea");
        inputs.forEach((input) => {
            input.readOnly = true;
        });

        // Altera o ícone do botão para "✏️"
        const botaoEdicao = card.querySelector(".edit-button");
        botaoEdicao.textContent = "✏️";
    });

    localStorage.setItem("listasSalvas", JSON.stringify(listasSalvas));
    alert("Listas salvas com sucesso!");
}

// Função para carregar as listas salvas ao carregar a página
function carregarListasSalvas() {
    const listasSalvas = JSON.parse(localStorage.getItem("listasSalvas")) || [];
    const container = document.getElementById("lista-container");

    listasSalvas.forEach((lista) => {
        const novoCard = document.createElement("div");
        novoCard.className = "lista-card";
        novoCard.innerHTML = `
            <div class="header">
                <input type="text" name="nome_lista" placeholder="Nome da Lista" value="${lista.nome}" readonly>
                <div class="icons">
                    <button class="edit-button" onclick="alternarEdicao(this)">✏️</button>
                    <button class="delete-button" onclick="excluirLista(this)">❌</button>
                </div>
            </div>
            <textarea name="lista" placeholder="Insira os elementos separados por vírgula (ex: João, Maria, Pedro)" readonly>${lista.valores}</textarea>
        `;
        container.appendChild(novoCard);
    });
}

// Carrega as listas salvas ao carregar a página
carregarListasSalvas();

// Envia as listas salvas para o backend ao calcular a interseção
document.getElementById("calcular-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const listasSalvas = JSON.parse(localStorage.getItem("listasSalvas")) || [];

    // Cria um formulário dinâmico para enviar os dados
    const formData = new FormData();
    listasSalvas.forEach((lista) => {
        formData.append("nome_lista", lista.nome);
        formData.append("lista", lista.valores);
    });

    // Envia os dados para o backend
    fetch("/", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("resultado").innerHTML = data;
        });
});