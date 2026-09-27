const url = "../produtos.json";

const validarForm = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const email = form.querySelector("input[name='email']"); 
    const checkbox = form.querySelector("input[name='checkbox']");
    let valorEmail = email.value.trim();

    if (valorEmail === "") {
        valorEmail = prompt("Por favor, preencha o campo de email:");
        if (valorEmail) email.value = valorEmail;
    }

    if (!valorEmail) {
        alert("Você precisa preencher o campo de email para se cadastrar.");
        return;
    }

    const arroba = valorEmail.includes("@");
    const ponto = valorEmail.includes(".", valorEmail.indexOf("@"));
    const tamanho = valorEmail.length >= 10;

    if (!arroba || !ponto || !tamanho){
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    if (!checkbox.checked){
        checkbox.style.backgroundColor = "red";
        alert("Por favor, aceite os termos!");
        return;
    }

    alert(`Cadastro do email: ${valorEmail} realizado com sucesso!`);
    email.value = "";
    checkbox.checked = false;
};

const carregarDetalhes = async () => {
    const article = document.querySelector("article");
    if (!article) return;

    article.innerHTML = "<p>Carregando pizzas...</p>";

    try {
        const response = await fetch(url);
        const pizzas = await response.json();
        article.innerHTML = "";

        pizzas.forEach(pizza => {
            article.innerHTML += `
                <section class="container" id="pizza-${pizza.id}"> 
                    <div class="item">
                        <div class="left">
                            <img src="../${pizza.imagem}" alt="${pizza.produto}" class="imgs">
                            <div class="wrapper">
                                <button class="btm">Comprar</button>
                            </div>
                        </div>
                        <div class="info"> 
                            <h2>${pizza.produto}</h2>
                            <h5>${pizza.descricao}</h5>
                            <form>
                                <fieldset>
                                    <legend class="text">Cadastre-se</legend>
                                    <div>  
                                        <label for="email-${pizza.id}">Email</label>
                                        <input type="text" name="email" placeholder="Digite seu email">
                                    </div>
                                    <div class="checkbox-area">
                                        <label for="checkbox-${pizza.id}">Aceitar os termos de uso</label>
                                        <input type="checkbox" name="checkbox">
                                    </div>
                                    <div>
                                        <input type="submit" value="Enviar" id="btmEnviar">
                                    </div>
                                </fieldset>
                            </form>
                        </div>                    
                    </div>
                </section>
            `;
        });

        const formularios = document.querySelectorAll("form");
        formularios.forEach(form => {
            form.addEventListener("submit", validarForm);
        });

        // Rola até o card da pizza clicada no cardápio
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const elementoAlvo = document.querySelector(hash);
                if (elementoAlvo) {
                    elementoAlvo.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }

    } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
        article.innerHTML = "<p>Erro ao carregar os detalhes.</p>";
    }
};

carregarDetalhes();