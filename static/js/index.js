// Função para exibir mensagens de feedback
function exibirMensagem(mensagem, tipo) {
    const divMensagem = document.getElementById("mensagem");
    divMensagem.textContent = mensagem;
    divMensagem.className = tipo;
    divMensagem.style.display = "block";
    setTimeout(() => divMensagem.style.display = "none", 3000);
}

// Função para adicionar uma nova lista
function adicionarLista() {
    const container = document.getElementById("lista-container");
    const novoCard = document.createElement("div");
    novoCard.className = "lista-card";
    novoCard.innerHTML = `
        <div class="header">
            <input type="text" name="nome_lista" placeholder="Nome da Lista">
            <div class="icons">
                <button type="button" class="edit-button">✏️</button>
                <button type="button" class="delete-button">❌</button>
            </div>
        </div>
        <textarea name="lista" placeholder="Insira os elementos separados por vírgula (ex: João, Maria, Pedro)"></textarea>
    `;
    container.appendChild(novoCard);

    // Adiciona eventos aos botões dentro do novo card
    const botaoEditar = novoCard.querySelector(".edit-button");
    const botaoExcluir = novoCard.querySelector(".delete-button");

    botaoEditar.addEventListener("click", () => alternarEdicao(botaoEditar));
    botaoExcluir.addEventListener("click", () => excluirLista(botaoExcluir));
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
    salvarListas();
    exibirMensagem("Lista excluída", "erro");
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
    exibirMensagem("Listas salvas", "sucesso");
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
                    <button type="button" class="edit-button">✏️</button>
                    <button type="button" class="delete-button">❌</button>
                </div>
            </div>
            <textarea name="lista" placeholder="Insira os elementos separados por vírgula (ex: João, Maria, Pedro)" readonly>${lista.valores}</textarea>
        `;
        container.appendChild(novoCard);

        // Adiciona eventos aos botões dentro do novo card
        const botaoEditar = novoCard.querySelector(".edit-button");
        const botaoExcluir = novoCard.querySelector(".delete-button");

        botaoEditar.addEventListener("click", () => alternarEdicao(botaoEditar));
        botaoExcluir.addEventListener("click", () => excluirLista(botaoExcluir));
    });
}

// Função para calcular a interseção
function calcularIntersecao() {
    const cards = document.querySelectorAll(".lista-card");
    const listas = [];

    cards.forEach((card) => {
        const valores = card.querySelector('textarea[name="lista"]').value;
        if (valores.trim()) {
            const elementos = valores.split(",").map((item) => item.trim());
            listas.push(new Set(elementos));
        }
    });

    if (listas.length < 2) {
        exibirMensagem("Não foi possível calcular. Insira novas listas e atribua valores.", "erro");
        return;
    }

    let interseção = listas[0];
    for (let i = 1; i < listas.length; i++) {
        interseção = new Set([...interseção].filter((x) => listas[i].has(x)));
    }

    if (interseção.size === 0) {
        exibirMensagem("Não há interseção entre as listas.", "erro");
        document.getElementById("resultado").innerText = "";
    } else {
        const resultado = `Resultado: ${Array.from(interseção).join(", ")}`;
        document.getElementById("resultado").innerText = resultado;
    }
}

// Função para calcular a união
function calcularUniao() {
    const cards = document.querySelectorAll(".lista-card");
    const listas = [];

    cards.forEach((card) => {
        const valores = card.querySelector('textarea[name="lista"]').value;
        if (valores.trim()) {
            const elementos = valores.split(",").map((item) => item.trim());
            listas.push(new Set(elementos));
        }
    });

    if (listas.length < 2) {
        exibirMensagem("Não foi possível calcular. Insira novas listas e atribua valores.", "erro");
        return;
    }

    let uniaoTotal = listas[0];
    for (let i = 1; i < listas.length; i++) {
        uniaoTotal = new Set([...uniaoTotal, ...listas[i]]);
    }

    const resultado = `Resultado: ${Array.from(uniaoTotal).join(", ")}`;
    document.getElementById("resultado").innerText = resultado;
}

// Função para resetar tudo
function resetarTudo() {
    document.getElementById("resultado").innerText = "";
    const container = document.getElementById("lista-container");
    container.innerHTML = "";
    localStorage.removeItem("listasSalvas");
    exibirMensagem("Tudo foi resetado com sucesso!", "sucesso");
}

// Event Listeners
document.getElementById("adicionar-lista").addEventListener("click", adicionarLista);
document.getElementById("salvar-listas").addEventListener("click", salvarListas);
document.getElementById("resetar-tudo").addEventListener("click", resetarTudo);
document.getElementById("calcular-intersecao").addEventListener("click", calcularIntersecao);
document.getElementById("calcular-uniao").addEventListener("click", calcularUniao);

// Carrega as listas salvas ao carregar a página
document.addEventListener("DOMContentLoaded", carregarListasSalvas);