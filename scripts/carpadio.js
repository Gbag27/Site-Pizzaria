const url = "../produtos.json"; 
const carregarCardapio = async () => {
    const article = document.querySelector("article");
    if (!article) return;

    article.innerHTML = "<h2>Carregando...</h2>";

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro ao carregar dados: ${response.status}`);
        }

        const pizzas = await response.json();

        article.innerHTML = pizzas.map(pizza => `
            <div class="item">
                <div class="imgs">
                    <img src="../${pizza.imagem}" alt="${pizza.produto}">
                </div>
                <h3>${pizza.produto}</h3>
                <a href="detalhes.html#pizza-${pizza.id}">
                    <button class="btm">Detalhes</button>
                </a>
            </div>
        `).join("");

    } catch (error) {
        console.error("Erro no fetch:", error);
        article.innerHTML = "<h2>Erro ao carregar o cardápio.</h2>";
    }
};

carregarCardapio();