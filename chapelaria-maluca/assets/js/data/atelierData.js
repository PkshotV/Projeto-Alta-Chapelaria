export const AtelierData = {
  /**
   * 1. AtelierData: Catálogo Geral, Modelos Base, Matérias-Primas, Extras e Regiões
   */
      catalog: [
        {
          id: 'cartola-cronometro',
          name: 'Cartola Cronômetro 10/6',
          category: 'surrealistas',
          categoryLabel: 'Surrealistas',
          badge: 'Ícone do Ateliê',
          price: 'R$ 790,00',
          leadTime: '12 dias úteis',
          material: 'Feltro 100% Lã & Latão',
          description: 'Copa alta escultural em veludo índigo profundo, engrenagem relojoeira em ouro antigo e o clássico cartão tipográfico 10/6.',
          calcPreset: { model: 'cartola', material: 'feltro', brim: 8, extras: ['forro', 'adorno106'] }
        },
        {
          id: 'panama-montecristi',
          name: 'Panamá Montecristi Fino',
          category: 'classicos',
          categoryLabel: 'Clássicos',
          badge: 'Palha Toquilla',
          price: 'R$ 980,00',
          leadTime: '14 dias úteis',
          material: 'Palha Toquilla Equatoriana',
          description: 'Tecido manualmente com fibra Carludovica palmata, leveza extraordinária e fita de gorgorão preta clássica.',
          calcPreset: { model: 'panama', material: 'toquilla', brim: 8, extras: ['carneira', 'fita'] }
        },
        {
          id: 'fedora-lebre-5x',
          name: 'Fedora Imperial Pêlo de Lebre 5X',
          category: 'limitada',
          categoryLabel: 'Edição Limitada',
          badge: 'Alta Chapelaria',
          price: 'R$ 1.690,00',
          leadTime: '16 dias úteis',
          material: 'Pêlo de Lebre Legítimo 5X',
          description: 'Toque aveludado incomparável em pêlo de lebre 5X, carneira em couro legítimo e forro de cetim com monograma.',
          calcPreset: { model: 'fedora', material: 'lebre', brim: 7, extras: ['carneira', 'forro', 'fita', 'caixa'] }
        },
        {
          id: 'vaqueiro-sertao',
          name: 'Vaqueiro Mestre do Sertão',
          category: 'classicos',
          categoryLabel: 'Clássicos',
          badge: 'Couro Legítimo',
          price: 'R$ 265,00',
          leadTime: '8 dias úteis',
          material: 'Couro Legítimo Curtido',
          description: 'Inspirado na tradição nordestina de Caruaru e do Cangaço, em couro curtido resistente com barbicacho trançado.',
          calcPreset: { model: 'vaqueiro', material: 'couro', brim: 10, extras: ['fita', 'impermeabilizacao'] }
        },
        {
          id: 'campeiro-pampas',
          name: 'Campeiro Estância dos Pampas',
          category: 'classicos',
          categoryLabel: 'Clássicos',
          badge: 'Tradição Sul',
          price: 'R$ 460,00',
          leadTime: '9 dias úteis',
          material: 'Feltro 100% Lã Importada',
          description: 'Aba firme e copa anatômica em feltro de lã encorpado com fita de couro trançado e impermeabilização.',
          calcPreset: { model: 'campeiro', material: 'feltro', brim: 10, extras: ['carneira', 'fita', 'impermeabilizacao'] }
        },
        {
          id: 'sombrero-charro-ouro',
          name: 'Sombrero Charro Gala Jalisco',
          category: 'surrealistas',
          categoryLabel: 'Surrealistas',
          badge: 'Aba 15 cm',
          price: 'R$ 1.180,00',
          leadTime: '15 dias úteis',
          material: 'Feltro 100% Lã Importada',
          description: 'Aba ampla de 15 cm com bordados dourados geométricos, copa alta e acabamento de gala.',
          calcPreset: { model: 'sombrero', material: 'feltro', brim: 15, extras: ['carneira', 'forro', 'fita'] }
        }
      ],

      models: [
        { id: 'cartola', name: 'Cartola', basePrice: 360, baseHours: 11, defaultBrim: 7, benchCategory: 'feltro-nacional' },
        { id: 'fedora', name: 'Fedora / Borsalino', basePrice: 290, baseHours: 9, defaultBrim: 7, benchCategory: 'feltro-nacional' },
        { id: 'panama', name: 'Chapéu Panamá', basePrice: 340, baseHours: 12, defaultBrim: 8, benchCategory: 'panama-toquilla' },
        { id: 'bowler', name: 'Chapéu-Coco / Bowler', basePrice: 310, baseHours: 9, defaultBrim: 5, benchCategory: 'feltro-nacional' },
        { id: 'cloche', name: 'Cloche', basePrice: 270, baseHours: 8, defaultBrim: 5, benchCategory: 'feltro-nacional' },
        { id: 'boina', name: 'Boina Basca', basePrice: 185, baseHours: 6, defaultBrim: 4, benchCategory: 'popular-festa' },
        { id: 'sombrero', name: 'Sombrero Charro', basePrice: 420, baseHours: 14, defaultBrim: 15, benchCategory: 'feltro-nacional' },
        { id: 'campeiro', name: 'Campeiro Gaúcho', basePrice: 280, baseHours: 8, defaultBrim: 10, benchCategory: 'feltro-nacional' },
        { id: 'vaqueiro', name: 'Vaqueiro Nordestino em Couro', basePrice: 175, baseHours: 7, defaultBrim: 10, benchCategory: 'couro-nordestino' }
      ],

      materials: [
        { id: 'sintetico', name: 'Sintético / Festa', multiplier: 0.45, extraHours: 0, hex: '#4B3B75', light: '#6D58A6', stroke: '#F3D08A', benchKey: 'popular-festa' },
        { id: 'couro', name: 'Couro Legítimo Curtido', multiplier: 0.95, extraHours: 2, hex: '#8A4B22', light: '#B86B35', stroke: '#F3D08A', benchKey: 'couro-nordestino' },
        { id: 'feltro', name: 'Feltro 100% Lã Importada', multiplier: 1.35, extraHours: 3, hex: '#1B142E', light: '#382A5C', stroke: '#D4A359', benchKey: 'feltro-nacional' },
        { id: 'toquilla', name: 'Palha Toquilla Equatoriana', multiplier: 2.15, extraHours: 5, hex: '#D8C39E', light: '#EFE1C6', stroke: '#8E244D', benchKey: 'panama-toquilla' },
        { id: 'lebre', name: 'Pêlo de Lebre Legítimo 5X', multiplier: 3.45, extraHours: 7, hex: '#5C1833', light: '#8E244D', stroke: '#F3D08A', benchKey: 'pelo-lebre-5x' }
      ],

      extras: [
        { id: 'carneira', name: 'Carneira em couro', price: 48, hours: 1 },
        { id: 'forro', name: 'Forro de cetim com monograma', price: 65, hours: 2 },
        { id: 'fita', name: 'Fita de gorgorão / couro trançado', price: 42, hours: 1 },
        { id: 'adorno106', name: 'Adorno surrealista 10/6', price: 78, hours: 2 },
        { id: 'impermeabilizacao', name: 'Impermeabilização', price: 39, hours: 1 },
        { id: 'caixa', name: 'Caixa rígida de colecionador', price: 85, hours: 0 }
      ],

      regions: [
        { id: 'sudeste', name: 'Sudeste (SP, RJ, MG, ES)', shipping: 29, eta: '3–5 dias úteis' },
        { id: 'sul', name: 'Sul (PR, SC, RS)', shipping: 36, eta: '4–6 dias úteis' },
        { id: 'centro-oeste', name: 'Centro-Oeste (GO, MT, MS, DF)', shipping: 44, eta: '5–7 dias úteis' },
        { id: 'nordeste', name: 'Nordeste (PE, BA, CE, PB, RN+)', shipping: 54, eta: '6–9 dias úteis' },
        { id: 'norte', name: 'Norte (AM, PA, TO, RO+)', shipping: 68, eta: '8–12 dias úteis' }
      ]
};

export const BrazilMarketData = {
  /**
   * 2. BrazilMarketData: Pesquisa Real de Preços por Faixa & Região do Brasil
   */
      benchmarks: [
        {
          id: 'popular-festa',
          title: 'Linha Popular & Festa',
          minPrice: 24,
          maxPrice: 159,
          regions: ['sudeste', 'sul', 'centro-oeste', 'nordeste', 'norte'],
          regionLabel: 'Todo o Brasil (Polos: 25 de Março-SP, Feiras Populares)',
          materialsNote: 'Poliéster prensado, palha sintética, EVA e tecidos leves para eventos.',
          barLeftPct: 1,
          barWidthPct: 12,
          barColor: 'bg-sky-600',
          calcPreset: { model: 'boina', material: 'sintetico', brim: 5, extras: ['fita'], region: 'sudeste' }
        },
        {
          id: 'couro-nordestino',
          title: 'Couro Artesanal Nordestino / Vaqueiro & Cangaço',
          minPrice: 54,
          maxPrice: 285,
          regions: ['nordeste', 'norte', 'centro-oeste', 'sudeste'],
          regionLabel: 'Nordeste & Norte (Caruaru-PE, Juazeiro do Norte-CE, Feira de Santana-BA)',
          materialsNote: 'Couro de bode e boi curtido artesanalmente, costura reforçada e barbicacho.',
          barLeftPct: 3,
          barWidthPct: 18,
          barColor: 'bg-amber-600',
          calcPreset: { model: 'vaqueiro', material: 'couro', brim: 10, extras: ['fita', 'impermeabilizacao'], region: 'nordeste' }
        },
        {
          id: 'feltro-nacional',
          title: 'Feltro 100% Lã Nacional — Campeiro Gaúcho, Country & Fedora',
          minPrice: 259,
          maxPrice: 679,
          regions: ['sul', 'centro-oeste', 'sudeste'],
          regionLabel: 'Sul, Centro-Oeste & Sudeste (Pampas-RS, Barretos-SP, Goiânia-GO)',
          materialsNote: 'Feltro 100% lã de carneiro encorpada com alta retenção de forma e carneira.',
          barLeftPct: 12,
          barWidthPct: 28,
          barColor: 'bg-hat-emerald',
          calcPreset: { model: 'campeiro', material: 'feltro', brim: 10, extras: ['carneira', 'fita'], region: 'sul' }
        },
        {
          id: 'panama-toquilla',
          title: 'Chapéu Panamá Original em Palha Toquilla Importada',
          minPrice: 544,
          maxPrice: 1750,
          regions: ['sudeste', 'sul', 'centro-oeste', 'nordeste'],
          regionLabel: 'Capitais & Litoral (São Paulo-SP, Rio de Janeiro-RJ, Curitiba-PR, Brasília-DF)',
          materialsNote: 'Palha Carludovica palmata tecida à mão no Equador (graus Cuenca a Montecristi).',
          barLeftPct: 24,
          barWidthPct: 52,
          barColor: 'bg-hat-gold',
          calcPreset: { model: 'panama', material: 'toquilla', brim: 8, extras: ['carneira', 'fita', 'caixa'], region: 'sudeste' }
        },
        {
          id: 'pelo-lebre-5x',
          title: 'Alta Chapelaria em Pêlo de Lebre 3X–5X — Cury, Ramenzoni & Stetson',
          minPrice: 1350,
          maxPrice: 2322,
          regions: ['sudeste', 'sul', 'centro-oeste'],
          regionLabel: 'Polo Histórico Campinas-SP, Sul & Colecionadores Nacionais',
          materialsNote: 'Feltro nobre de pêlo de lebre/coelho 3X a 5X, acabamento aveludado e forro de cetim.',
          barLeftPct: 58,
          barWidthPct: 42,
          barColor: 'bg-hat-bordeaux',
          calcPreset: { model: 'fedora', material: 'lebre', brim: 8, extras: ['carneira', 'forro', 'fita', 'caixa'], region: 'sudeste' }
        }
      ],

      init() {
        this.render('todas');
        document.querySelectorAll('.br-region-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            document.querySelectorAll('.br-region-btn').forEach(b => {
              b.classList.remove('active', 'bg-hat-indigo', 'text-hat-goldLight', 'font-bold');
              b.classList.add('bg-white', 'text-hat-indigo', 'font-semibold');
            });
            btn.classList.add('active', 'bg-hat-indigo', 'text-hat-goldLight', 'font-bold');
            btn.classList.remove('bg-white', 'text-hat-indigo', 'font-semibold');
            this.render(btn.dataset.region);
          });
        });
      },

      render(regionFilter) {
        const container = document.getElementById('brazil-market-list');
        if (!container) return;

        const filtered = regionFilter === 'todas'
          ? this.benchmarks
          : this.benchmarks.filter(item => item.regions.includes(regionFilter));

        const maxScale = 2350;

        container.innerHTML = filtered.map(item => {
          const leftPct = Math.max(1, Math.round((item.minPrice / maxScale) * 100));
          const widthPct = Math.max(10, Math.round(((item.maxPrice - item.minPrice) / maxScale) * 100));

          return `
            <article class="bg-white rounded-3xl p-6 sm:p-7 border border-hat-indigo/12 shadow-editorial transition-all hover:border-hat-bordeaux/40">
              <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div class="space-y-1 max-w-2xl">
                  <span class="text-[11px] font-bold uppercase tracking-wider text-hat-bordeaux block">${item.regionLabel}</span>
                  <h3 class="font-editorial font-bold text-xl sm:text-2xl text-hat-indigo">${item.title}</h3>
                  <p class="text-xs sm:text-sm text-hat-ink/75">${item.materialsNote}</p>
                </div>

                <div class="flex flex-wrap sm:flex-nowrap items-center gap-4 shrink-0">
                  <div class="text-left sm:text-right">
                    <span class="text-[10px] uppercase tracking-wider text-hat-ink/60 block font-bold">Faixa Real no Brasil</span>
                    <strong class="font-editorial font-extrabold text-xl sm:text-2xl text-hat-indigo">
                      R$ ${item.minPrice.toLocaleString('pt-BR')} a R$ ${item.maxPrice.toLocaleString('pt-BR')}
                    </strong>
                  </div>

                  <button type="button" onclick="BrazilMarketData.simulateInCalculator('${item.id}')"
                    class="px-5 py-3 rounded-2xl bg-hat-indigo hover:bg-hat-bordeaux text-hat-goldLight font-bold text-xs sm:text-sm transition-colors shadow-md whitespace-nowrap">
                    Simular na Calculadora →
                  </button>
                </div>
              </div>

              <!-- Barra Comparativa Visual -->
              <div class="mt-5 pt-4 border-t border-hat-indigo/10">
                <div class="flex justify-between text-[11px] font-semibold text-hat-ink/55 mb-1.5">
                  <span>R$ 24 (Popular)</span>
                  <span>R$ 600</span>
                  <span>R$ 1.200</span>
                  <span>R$ 1.800</span>
                  <span>R$ 2.322+ (5X Luxo)</span>
                </div>
                <div class="w-full h-3.5 rounded-full bg-hat-creamDark overflow-hidden relative">
                  <div class="h-full rounded-full ${item.barColor} transition-all duration-500" style="margin-left: ${leftPct}%; width: ${widthPct}%;"></div>
                </div>
              </div>
            </article>
          `;
        }).join('');
      },

      simulateInCalculator(benchmarkId) {
        const bench = this.benchmarks.find(b => b.id === benchmarkId);
        if (!bench) return;
        window.PriceCalculatorEngine?.applyPreset(bench.calcPreset);
        document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' });
        window.UIHelpers?.showToast(`Perfil "${bench.title}" carregado na Calculadora!`);
      }
};

export const WorldHatsAtlasData = {
  /**
   * 3. WorldHatsAtlasData: 8 Destinos Históricos pelo Mundo
   */
      destinations: [
        {
          id: 'equador',
          shortName: 'Equador',
          location: 'Cuenca & Montecristi, Equador',
          flag: '🇪🇨',
          hatName: 'Chapéu Panamá (Palha Toquilla)',
          century: 'Século XVII–XIX',
          material: 'Palha Carludovica palmata',
          culturalIcon: 'Patrimônio Imaterial UNESCO',
          history: 'Embora tenha recebido o nome durante a construção do Canal do Panamá, o verdadeiro Chapéu Panamá é tecido à mão há séculos no Equador. Os exemplares Montecristi Superfino levam meses de trançado manual com fibras finíssimas.',
          coords: { x: 222, y: 244 },
          svgModel: { model: 'panama', material: 'toquilla', brim: 8, extras: ['fita'] },
          calcPreset: { model: 'panama', material: 'toquilla', brim: 8, extras: ['carneira', 'fita'] }
        },
        {
          id: 'italia',
          shortName: 'Itália',
          location: 'Alessandria, Itália',
          flag: '🇮🇹',
          hatName: 'Fedora & Borsalino',
          century: 'Século XIX (1857)',
          material: 'Feltro de Pêlo de Lebre & Lã Fina',
          culturalIcon: 'Cinema Noir & Alta Alfaiataria',
          history: 'Consagrado em Alessandria por Giuseppe Borsalino em 1857, o Fedora combina copa vincada longitudinalmente e aba maleável que pode ser dobrada para frente ou para cima, tornando-se ícone eterno da elegância masculina e feminina.',
          coords: { x: 454, y: 118 },
          svgModel: { model: 'fedora', material: 'lebre', brim: 7, extras: ['carneira', 'fita'] },
          calcPreset: { model: 'fedora', material: 'lebre', brim: 7, extras: ['carneira', 'forro', 'fita'] }
        },
        {
          id: 'inglaterra',
          shortName: 'Inglaterra',
          location: 'Londres, Inglaterra',
          flag: '🇬🇧',
          hatName: 'Cartola Vitoriana & Chapéu-Coco (Bowler)',
          century: 'Século XVIII–XIX',
          material: 'Pelúcia de Seda & Feltro Rígido',
          culturalIcon: 'Era Vitoriana & Charles Chaplin',
          history: 'Nas oficinas de St. James’s em Londres, a Cartola dominou as cerimônias reais, enquanto o Chapéu-Coco (Bowler) foi criado em 1849 pelos irmãos Lock para proteger cavaleiros e conquistou as ruas londrinas e o cinema.',
          coords: { x: 422, y: 102 },
          svgModel: { model: 'cartola', material: 'feltro', brim: 7, extras: ['adorno106'] },
          calcPreset: { model: 'cartola', material: 'feltro', brim: 7, extras: ['carneira', 'forro', 'adorno106'] }
        },
        {
          id: 'franca',
          shortName: 'França',
          location: 'Paris & País Basco, França',
          flag: '🇫🇷',
          hatName: 'Cloche 1920 & Boina Basca (Béret)',
          century: 'Século XIX & Anos 1920',
          material: 'Lã Merino Feltrada & Veludo',
          culturalIcon: 'Vanguarda Parisiense & Artistas',
          history: 'Dos pastores dos Pireneus franceses aos ateliês de Montmartre, a Boina Basca tornou-se símbolo da arte e boemia. Já nos loucos anos 1920 em Paris, o chapéu Cloche em formato de sino revolucionou a moda feminina.',
          coords: { x: 432, y: 114 },
          svgModel: { model: 'boina', material: 'lebre', brim: 4, extras: ['forro'] },
          calcPreset: { model: 'boina', material: 'feltro', brim: 4, extras: ['forro'] }
        },
        {
          id: 'mexico',
          shortName: 'México',
          location: 'Jalisco, México',
          flag: '🇲🇽',
          hatName: 'Sombrero Charro Bordado',
          century: 'Século XVIII–XIX',
          material: 'Feltro Encorpado & Fios Metálicos',
          culturalIcon: 'Tradição Mariachi & Charrería',
          history: 'Nascido entre os cavaleiros de Jalisco para proteger do sol intenso do planalto mexicano, o Sombrero Charro exibe abas monumentais de até 16 cm ricamente bordadas com motivos geométricos em prata e ouro.',
          coords: { x: 175, y: 188 },
          svgModel: { model: 'sombrero', material: 'feltro', brim: 15, extras: ['fita'] },
          calcPreset: { model: 'sombrero', material: 'feltro', brim: 15, extras: ['carneira', 'fita'] }
        },
        {
          id: 'australia',
          shortName: 'Austrália',
          location: 'Nova Gales do Sul, Austrália',
          flag: '🇦🇺',
          hatName: 'Akubra Slouch Hat',
          century: 'Século XIX (1876)',
          material: 'Feltro de Pele de Coelho Impermeável',
          culturalIcon: 'Outback Australiano & Aventura',
          history: 'Forjado para resistir ao sol escaldante e às chuvas torrenciais do Outback australiano, o Akubra possui aba larga estruturada e tira de couro trançado, sendo emblema nacional de resistência e exploração.',
          coords: { x: 765, y: 325 },
          svgModel: { model: 'campeiro', material: 'couro', brim: 11, extras: ['fita', 'impermeabilizacao'] },
          calcPreset: { model: 'campeiro', material: 'lebre', brim: 11, extras: ['carneira', 'fita', 'impermeabilizacao'] }
        },
        {
          id: 'russia',
          shortName: 'Rússia',
          location: 'Moscou, Rússia',
          flag: '🇷🇺',
          hatName: 'Ushanka de Inverno',
          century: 'Século XVII–XX',
          material: 'Lã Densa, Pele Sintética & Forro Acolchoado',
          culturalIcon: 'Inverno Ártico & Arquitetura Eslava',
          history: 'Projetado com abas auriculares articuladas que podem ser atadas no topo ou sob o queixo em temperaturas abaixo de -30°C, o Ushanka combina engenharia térmica extrema com silhueta inconfundível.',
          coords: { x: 545, y: 88 },
          svgModel: { model: 'ushanka', material: 'feltro', brim: 5, extras: ['forro'] },
          calcPreset: { model: 'bowler', material: 'feltro', brim: 5, extras: ['forro', 'impermeabilizacao'] }
        },
        {
          id: 'brasil',
          shortName: 'Brasil',
          location: 'Caruaru-PE, Campinas-SP & Pampas-RS',
          flag: '🇧🇷',
          hatName: 'Couro Nordestino, Fedora Cury & Campeiro Gaúcho',
          century: 'Século XIX–XX',
          material: 'Couro Curtido, Lã Gaúcha & Pêlo de Lebre',
          culturalIcon: 'Diversidade Cultural Brasileira',
          history: 'O Brasil reúne três grandes escolas: o chapéu de couro do vaqueiro nordestino em Caruaru-PE, a tradição gauchesca dos Pampas-RS e a histórica fábrica Cury em Campinas-SP, que exportou fedoras de pêlo de lebre para Hollywood.',
          coords: { x: 282, y: 292 },
          svgModel: { model: 'vaqueiro', material: 'couro', brim: 10, extras: ['fita'] },
          calcPreset: { model: 'vaqueiro', material: 'couro', brim: 10, extras: ['carneira', 'fita', 'impermeabilizacao'] }
        }
      ]
};