# Projeto-Alta-Chapelaria
🎩 Chapelaria Maluca — Aplicação web interativa de chapelaria artesanal com vitrine de rolagem contínua para a direita, calculadora de preços em tempo real, pesquisa de valores pelo Brasil, atlas mundial interativo de modelos e customizador SVG ao vivo. Desenvolvido com HTML5, CSS3 e JavaScript ES6+ modular.


# 🎩 Chapelaria Maluca — Ateliê Artesanal & Design Surrealista

> Aplicação web interativa desenvolvida para demonstrar arquitetura Front-End moderna, manipulação dinâmica de SVG, animações fluidas a 60 FPS e regras de negócio aplicadas em tempo real — sem dependência de frameworks externos.

🔗 **Acesse o projeto online:** `https://SEU-USUARIO.github.io/chapelaria-maluca/` *(substitua pelo seu link do GitHub Pages)*

---

## ✨ Funcionalidades Principais

- **Hero Cinematográfico & Cartola Parallax 3D:** Entrada escalonada (*stagger reveal*) com ilustração vetorial interativa que reage ao movimento do cursor em perspectiva 3D e dispara partículas ao clique.
- **Vitrine com Rolagem Contínua para a Direita:** Carrossel infinito (`@keyframes scrollRight`) com pausa automática no *hover*, seletor de velocidade (*Suave*, *Normal*, *Acelerado*), inversão de sentido e modal de inspeção detalhada.
- **Calculadora de Preços em Tempo Real:**
  - Seleção entre **9 modelos base**, **5 matérias-primas**, **6 acabamentos artesanais** e **5 regiões de envio no Brasil**.
  - Controle deslizante da **largura da aba (4 cm a 16 cm)** que recalcula o valor e redesenha a proporção do chapéu em SVG instantaneamente.
  - Cálculo automático de desconto progressivo por quantidade, condição à vista no Pix (5% OFF), parcelamento, horas estimadas de bancada e posicionamento frente à média nacional.
- **Pesquisa de Preços pelo Brasil:** Painel comparativo filtrável pelas 5 regiões brasileiras (Sudeste, Sul, Centro-Oeste, Nordeste e Norte), cobrindo desde linhas populares até peças de alta chapelaria.
- **Voe pelo Mundo (Atlas Interativo):** Mapa-múndi em SVG com rotas animadas partindo do Brasil e 8 polos históricos da chapelaria mundial (*Equador, Itália, Inglaterra, França, México, Austrália, Rússia e Brasil*).
- **Ateliê Sob Medida & Coleções:** Cards com efeito *tilt 3D* e configurador ao vivo com **Modo Chapeleiro Maluco** para combinações aleatórias.

---

## 🛠️ Tecnologias & Conceitos Aplicados

- **HTML5 Semântico & SVG Dinâmico:** Geração e atualização em tempo real de silhuetas, texturas, fitas e adornos vetoriais via DOM.
- **CSS3 Moderno:** Design System baseado em variáveis (`:root`), CSS Grid, Flexbox, animações aceleradas por GPU (`transform: translate3d`) e layout responsivo *mobile-first*.
- **JavaScript (ES6+ Vanilla Modular):** Código desacoplado por responsabilidade única (*Separation of Concerns*), sem bibliotecas externas:
  - `AtelierData` — Base de dados de modelos, materiais, preços regionais e catálogo global.
  - `HatSVGBuilder` — Motor de renderização vetorial parametrizada.
  - `MarqueeController` — Controle de velocidade, direção e pausa da vitrine contínua.
  - `PriceCalculatorEngine` — Motor de precificação, descontos e benchmark de mercado.
  - `WorldAtlasController` — Navegação interativa pelo mapa-múndi e rotas históricas.
  - `ConfiguratorEngine` — Customizador sob medida e integração direta com o pedido.

---

## 📁 Estrutura Recomendada do Projeto

```text
chapelaria-maluca/
├── index.html                  # Estrutura semântica e seções da aplicação
├── assets/
│   ├── css/
│   │   ├── variables.css       # Paleta editorial, tipografia e tokens visuais
│   │   ├── animations.css      # Keyframes (rolagem à direita, stagger e 3D)
│   │   └── style.css           # Layout responsivo e componentes
│   └── js/
│       ├── data/
│       │   └── atelierData.js  # Catálogo, pesquisa Brasil e dados globais
│       ├── modules/
│       │   ├── svgBuilder.js   # Gerador dinâmico de chapéus em SVG
│       │   ├── marquee.js      # Controlador da vitrine contínua
│       │   ├── calculator.js   # Calculadora de orçamento em tempo real
│       │   └── worldAtlas.js   # Mapa interativo "Voe pelo Mundo"
│       └── main.js             # Inicialização e orquestração de eventos
└── README.md
```

---

## 🚀 Como Executar Localmente

1. Clone este repositório:
   ```bash
   git clone [https://github.com/SEU-USUARIO/chapelaria-maluca.git](https://github.com/SEU-USUARIO/chapelaria-maluca.git)
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd chapelaria-maluca
   ```
3. Abra o arquivo `index.html` diretamente no navegador ou utilize a extensão **Live Server** no VS Code.

---

## 👨‍💻 Autor

Desenvolvido por **Victor Matheus (Victor M.)**  
Estudante de Engenharia da Computação (FMU) • Desenvolvedor Front-End
