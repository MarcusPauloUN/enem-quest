export interface Topic {
  id: string
  title: string
  summary: string       // explicação do ancião (1 parágrafo simples)
  example: string       // exemplo resolvido passo a passo
  tip: string           // dica de prova (vira Poção de Dica)
}

export interface Arena {
  id: string
  title: string
  topics: Topic[]
}

export interface Kingdom {
  id: string
  name: string
  subject: 'matematica' | 'portugues' | 'ingles' | 'humanas' | 'natureza'
  color: number
  icon: string
  arenas: Arena[]
}

export interface World {
  id: string
  name: string
  serie: 1 | 2 | 3
  kingdoms: Kingdom[]
}

// ─── MUNDO 1 — 1ª Série ──────────────────────────────────────────────────────

const W1_MATEMATICA: Kingdom = {
  id: 'w1_mat',
  name: 'Reino dos Números',
  subject: 'matematica',
  color: 0x9c27b0,
  icon: '🔢',
  arenas: [
    {
      id: 'w1_mat_01', title: 'Conjuntos e Lógica',
      topics: [
        { id: 't01', title: 'Conceito de conjunto', summary: 'Um conjunto é uma coleção de elementos com algo em comum. Exemplo: o conjunto das vogais é {a, e, i, o, u}.', example: 'A = {1, 2, 3} e B = {2, 3, 4}. A ∩ B = {2, 3} (interseção) e A ∪ B = {1, 2, 3, 4} (união).', tip: 'No ENEM, problemas de conjunto costumam usar diagrama de Venn com duas ou três categorias — monte o diagrama antes de calcular.' },
        { id: 't02', title: 'União e Interseção', summary: 'União (∪) junta todos os elementos. Interseção (∩) pega só os que estão nos dois conjuntos.', example: 'Numa turma de 30 alunos, 18 gostam de Matemática e 14 gostam de Português. 8 gostam dos dois. Quantos não gostam de nenhuma? Use: Total = Mat + Port - Ambos + Nenhum.', tip: 'Cuidado com o "pelo menos um": use união, não soma direta.' },
        { id: 't03', title: 'Lógica Proposicional', summary: 'Uma proposição é uma afirmação que pode ser verdadeira ou falsa. Conectivos: E (∧), OU (∨), NÃO (¬), SE...ENTÃO (→).', example: 'P: "Chove" (V). Q: "Está frio" (F). P ∧ Q = V ∧ F = F. P ∨ Q = V ∨ F = V.', tip: 'A condicional P→Q só é falsa quando P é verdadeiro e Q é falso.' },
      ],
    },
    {
      id: 'w1_mat_02', title: 'Funções do 1º Grau',
      topics: [
        { id: 't04', title: 'Definição de função', summary: 'Função é uma regra que associa cada elemento de um conjunto a exatamente um elemento de outro conjunto. f(x) = 2x + 1 significa: pegue x, multiplique por 2 e some 1.', example: 'f(x) = 3x - 2. Para x = 4: f(4) = 3(4) - 2 = 12 - 2 = 10.', tip: 'Para verificar se é função, cada x deve ter apenas uma imagem — use o teste da reta vertical no gráfico.' },
        { id: 't05', title: 'Função afim e gráfico', summary: 'f(x) = ax + b é uma reta. "a" é a inclinação (coeficiente angular) e "b" é onde a reta corta o eixo y.', example: 'f(x) = 2x + 3. Coeficiente angular = 2 (cresce). Coeficiente linear = 3 (corta y em 3). Zero da função: 2x + 3 = 0 → x = -1,5.', tip: 'Se a > 0 a função é crescente; se a < 0 é decrescente. O zero é onde y = 0.' },
        { id: 't06', title: 'Equação do 1º Grau', summary: 'Resolver ax + b = 0 é encontrar o valor de x que torna a expressão verdadeira. Isole o x.', example: '3x - 9 = 0 → 3x = 9 → x = 3. Verificação: 3(3) - 9 = 0 ✓', tip: 'No ENEM, problemas de taxa fixa + valor por unidade são funções afins disfarçadas.' },
      ],
    },
    {
      id: 'w1_mat_03', title: 'Funções do 2º Grau',
      topics: [
        { id: 't07', title: 'Função quadrática', summary: 'f(x) = ax² + bx + c forma uma parábola. Se a > 0 abre para cima (mínimo); se a < 0 abre para baixo (máximo).', example: 'f(x) = x² - 4x + 3. Vértice: xv = -b/2a = 4/2 = 2. yv = f(2) = 4 - 8 + 3 = -1. Ponto mais baixo da parábola é (2, -1).', tip: 'O vértice dá o máximo ou mínimo — muito cobrado em problemas de lucro e área.' },
        { id: 't08', title: 'Fórmula de Bhaskara', summary: 'Para resolver ax² + bx + c = 0: Δ = b² - 4ac. Se Δ > 0: duas raízes. Se Δ = 0: uma raiz. Se Δ < 0: sem raízes reais.', example: 'x² - 5x + 6 = 0. Δ = 25 - 24 = 1. x = (5 ± 1)/2. x₁ = 3, x₂ = 2.', tip: 'Calcule Δ primeiro — se for negativo, já sabe que não há solução real e pode descartar.' },
        { id: 't09', title: 'Máximos e Mínimos', summary: 'O vértice da parábola representa o ponto de máximo (a < 0) ou mínimo (a > 0) da função.', example: 'Lucro: L(x) = -x² + 10x - 9. Máximo em xv = -10/(2·(-1)) = 5 unidades. Lmax = -25 + 50 - 9 = 16.', tip: 'Problemas de "maior lucro", "menor custo" ou "maior área" geralmente pedem o vértice.' },
      ],
    },
    {
      id: 'w1_mat_04', title: 'Progressões (PA e PG)',
      topics: [
        { id: 't10', title: 'Progressão Aritmética', summary: 'PA é uma sequência onde a diferença entre termos consecutivos é sempre a mesma (razão r). Fórmula: aₙ = a₁ + (n-1)r.', example: 'PA (2, 5, 8, 11...). r = 3. 10º termo: a₁₀ = 2 + (10-1)·3 = 2 + 27 = 29.', tip: 'Soma dos n primeiros termos: Sₙ = n·(a₁ + aₙ)/2 — use quando a questão pede soma de uma sequência regular.' },
        { id: 't11', title: 'Progressão Geométrica', summary: 'PG é uma sequência onde a razão entre termos consecutivos é sempre a mesma (q). Fórmula: aₙ = a₁ · q^(n-1).', example: 'PG (3, 6, 12, 24...). q = 2. 6º termo: a₆ = 3 · 2⁵ = 3 · 32 = 96.', tip: 'Crescimento exponencial (juros compostos, população, vírus) é sempre PG.' },
      ],
    },
    {
      id: 'w1_mat_05', title: 'Porcentagem e Matemática Financeira',
      topics: [
        { id: 't12', title: 'Porcentagem e razão', summary: 'Porcentagem é uma fração de 100. 25% = 25/100 = 0,25. Para calcular x% de N: N × x/100.', example: '30% de 80 = 80 × 0,30 = 24. Desconto de 20% em R$150: 150 × 0,20 = R$30 de desconto → paga R$120.', tip: 'Aumento de 20% seguido de desconto de 20% NÃO volta ao original: 100 × 1,2 × 0,8 = 96.' },
        { id: 't13', title: 'Juros Simples', summary: 'J = C · i · t. Onde C = capital, i = taxa, t = tempo. Montante: M = C + J = C(1 + it).', example: 'R$1.000 a 5% ao mês por 3 meses. J = 1000 × 0,05 × 3 = R$150. M = R$1.150.', tip: 'Juros simples crescem em linha reta (PA). Juros compostos crescem em curva (PG).' },
        { id: 't14', title: 'Juros Compostos', summary: 'M = C · (1 + i)^t. Os juros incidem sobre o montante acumulado ("juros sobre juros").', example: 'R$1.000 a 10% ao ano por 2 anos. M = 1000 × (1,1)² = 1000 × 1,21 = R$1.210.', tip: 'Use a calculadora do rascunho para (1 + i)^t — o ENEM geralmente fornece tabelas de potências.' },
      ],
    },
  ],
}

const W1_PORTUGUES: Kingdom = {
  id: 'w1_port',
  name: 'Floresta das Palavras',
  subject: 'portugues',
  color: 0x4a90d9,
  icon: '📖',
  arenas: [
    {
      id: 'w1_port_01', title: 'Interpretação de Texto',
      topics: [
        { id: 't20', title: 'Ideia principal e tema', summary: 'O tema é o assunto geral do texto. A ideia principal é a tese central que o autor defende. Sempre leia o título e o primeiro/último parágrafo primeiro.', example: 'Texto sobre desmatamento: tema = meio ambiente. Ideia principal = o desmatamento ameaça a biodiversidade e o clima.', tip: 'No ENEM, "o texto trata principalmente de..." pede o tema, não detalhes.' },
        { id: 't21', title: 'Inferência e implícito', summary: 'Inferir é deduzir algo que o texto sugere mas não diz diretamente. Use o contexto e o que é razoável deduzir.', example: 'Texto: "Maria chegou encharcada." Inferência: provavelmente choveu ou ela caiu na água — o texto não diz, mas é a conclusão lógica.', tip: 'Cuidado com inferências "forçadas" — a resposta correta é a que o texto suporta, não a mais criativa.' },
        { id: 't22', title: 'Intertextualidade', summary: 'Quando um texto faz referência a outro texto, obra, evento histórico ou cultural. Amplia o sentido da mensagem.', example: 'Uma propaganda usa a frase "Ser ou não ser" — referência a Hamlet de Shakespeare, sugerindo uma escolha difícil.', tip: 'O ENEM adora textos que dialogam com música, poesia, HQ e publicidade — leia o texto-base COM atenção à referência.' },
      ],
    },
    {
      id: 'w1_port_02', title: 'Tipos e Gêneros Textuais',
      topics: [
        { id: 't23', title: 'Tipos textuais', summary: 'Narração (conta uma história), Descrição (descreve), Dissertação (argumenta), Injunção (instrui), Exposição (explica).', example: 'Uma receita de bolo = injunção (usa verbos no imperativo: "adicione", "misture"). Uma notícia = exposição. Um romance = narração.', tip: 'O ENEM mistura tipos dentro do mesmo texto — identifique o tipo predominante.' },
        { id: 't24', title: 'Gêneros textuais', summary: 'Gênero é a forma social do texto: carta, editorial, crônica, poema, notícia, meme, artigo científico etc. Cada gênero tem linguagem e estrutura próprias.', example: 'Crônica: texto curto, linguagem leve, geralmente irônico, sobre o cotidiano. Editorial: opinião do jornal, sem assinatura, linguagem formal.', tip: 'A questão pode perguntar qual gênero adequado para determinada situação comunicativa — pense no contexto e nos interlocutores.' },
      ],
    },
    {
      id: 'w1_port_03', title: 'Figuras de Linguagem',
      topics: [
        { id: 't25', title: 'Metáfora e Metonímia', summary: 'Metáfora: comparação implícita ("Ele é uma raposa" = é esperto). Metonímia: substituição por relação de proximidade ("Beber um copo" = beber o conteúdo).', example: '"O Brasil ganhou" = metonímia (a seleção representa o país). "A vida é uma viagem" = metáfora.', tip: 'Se há "como" ou "parece" é símile (comparação explícita), não metáfora.' },
        { id: 't26', title: 'Ironia e Hipérbole', summary: 'Ironia: dizer o contrário do que se pensa para criticar. Hipérbole: exagero intencional para dar ênfase.', example: 'Ironia: "Que organizado esse quarto!" (quarto uma bagunça). Hipérbole: "Te esperei uma eternidade."', tip: 'No ENEM, ironia geralmente aparece em crônicas e charges — observe o tom e o contexto.' },
      ],
    },
    {
      id: 'w1_port_04', title: 'Fonologia e Ortografia',
      topics: [
        { id: 't27', title: 'Fonemas e sílabas', summary: 'Fonema é o menor som da língua. Letra é a representação escrita. "carro" tem 5 letras e 4 fonemas (o "r" dobrado é um fonema só).', example: '"fixo": 4 letras, 5 fonemas (f-i-k-s-o). Tonicidade: sílaba tônica é a mais forte — "ca-SA" (CA é tônica).', tip: 'Questões de fonologia no ENEM costumam aparecer embutidas em análise de poesia (ritmo e rima).' },
        { id: 't28', title: 'Acentuação e ortografia', summary: 'Regras principais: oxítona termina em a,e,i,o,u,em,ens → acento. Paroxítona termina em consoante (exceto s) → acento. Proparoxítona → sempre acento.', example: '"café" (oxítona, termina em e → acento). "fácil" (paroxítona, termina em l → acento). "lâmpada" (proparoxítona → acento).', tip: 'Após o Acordo Ortográfico de 2009: não se usa mais acento em "para", "pelo", "polo" e no hiato -ee-, -oo-.' },
      ],
    },
  ],
}

const W1_INGLES: Kingdom = {
  id: 'w1_ing',
  name: 'Portal das Línguas',
  subject: 'ingles',
  color: 0x00bcd4,
  icon: '🌍',
  arenas: [
    {
      id: 'w1_ing_01', title: 'Tempos Verbais Essenciais',
      topics: [
        { id: 't30', title: 'Simple Present e Present Continuous', summary: 'Simple Present: hábitos e fatos. "She works every day." Present Continuous: ação agora. "She is working now."', example: 'I study = eu estudo (hábito). I am studying = eu estou estudando (agora).', tip: 'Palavras-chave: always/never/usually → Simple Present. Now/at the moment → Continuous.' },
        { id: 't31', title: 'Simple Past e Past Continuous', summary: 'Simple Past: ação concluída no passado. "He went to school." Past Continuous: ação em progresso no passado. "He was going..."', example: '"When I arrived, she was cooking." → arrived = Simple Past (interrompeu). was cooking = Past Continuous (estava em progresso).', tip: 'Verbos irregulares mais comuns no ENEM: go/went, see/saw, have/had, come/came, take/took.' },
        { id: 't32', title: 'Future: will e going to', summary: '"Will" = decisão espontânea ou previsão. "Going to" = plano já decidido ou evidência visível.', example: '"Look at those clouds! It\'s going to rain." (evidência). "I\'ll help you with that." (decisão espontânea).', tip: 'No ENEM o foco é leitura — saber identificar o tempo verbal ajuda a entender a sequência dos eventos.' },
      ],
    },
    {
      id: 'w1_ing_02', title: 'Reading Comprehension',
      topics: [
        { id: 't33', title: 'Estratégias de leitura', summary: 'Skimming: leitura rápida para captar a ideia geral. Scanning: busca de informação específica. Cognatos: palavras parecidas com o português.', example: '"International", "natural", "democratic" são cognatos — têm o mesmo significado em inglês e português.', tip: 'No ENEM o texto em inglês tem questão de interpretação, não de tradução. Não trave em palavras desconhecidas — use o contexto.' },
        { id: 't34', title: 'False Friends', summary: 'Palavras que parecem iguais em inglês e português mas têm sentidos diferentes.', example: '"Actually" = na verdade (não "atualmente"). "Pretend" = fingir (não "pretender"). "Push" = empurrar (não "puxar").', tip: '"Eventually" = eventualmente em inglês = "no final", não "às vezes". Muito cobrado!' },
      ],
    },
    {
      id: 'w1_ing_03', title: 'Vocabulário e Gramática Aplicada',
      topics: [
        { id: 't35', title: 'Conectivos e coesão', summary: 'Conectivos ligam ideias. Adição: and, also, furthermore. Contraste: but, however, although. Causa: because, since, as. Conclusão: therefore, thus, so.', example: '"He studied hard; however, he failed the test." (contraste). "She was tired because she worked all night." (causa).', tip: 'Questões de inglês no ENEM frequentemente pedem o sentido de um conectivo para entender a relação entre ideias.' },
        { id: 't36', title: 'Modal Verbs', summary: 'Modais expressam possibilidade, obrigação, permissão. Can (pode), Must (deve), Should (deveria), May (talvez), Might (pode ser que).', example: '"You must wear a seatbelt." (obrigação). "You should study more." (conselho). "It might rain." (possibilidade).',  tip: '"Must not" = proibição forte. "Don\'t have to" = não é obrigatório (sem proibição).' },
      ],
    },
  ],
}

const W1_HUMANAS: Kingdom = {
  id: 'w1_hum',
  name: 'Cavernas do Tempo',
  subject: 'humanas',
  color: 0xe8a838,
  icon: '🏛️',
  arenas: [
    {
      id: 'w1_hum_01', title: 'Pré-história e Antiguidade',
      topics: [
        { id: 't40', title: 'Pré-história', summary: 'Período anterior à escrita (até ~3.500 a.C.). Paleolítico (pedra lascada, nomadismo) → Neolítico (pedra polida, agricultura, sedentarismo).', example: 'A invenção da agricultura no Neolítico permitiu o surgimento das primeiras cidades, pois os humanos pararam de migrar.', tip: 'O ENEM não cobra datas decoradas — cobra a relação entre mudança tecnológica e organização social.' },
        { id: 't41', title: 'Civilizações Antigas', summary: 'Mesopotâmia (escrita cuneiforme, Código de Hamurabi), Egito (Nilo, faraós, escrita hieroglífica), Grécia (democracia, filosofia), Roma (República, Império, direito).', example: 'O Código de Hamurabi (1750 a.C.) é o primeiro conjunto de leis escrito — princípio de "olho por olho, dente por dente".', tip: 'Quando o ENEM fala em "cidadania grega", lembre: só homens livres atenienses eram cidadãos — mulheres e escravos não.' },
      ],
    },
    {
      id: 'w1_hum_02', title: 'Idade Média',
      topics: [
        { id: 't42', title: 'Feudalismo', summary: 'Sistema político-econômico-social medieval. Rei → Nobres → Vassalos → Servos. Terra em troca de fidelidade e serviço militar. Igreja com enorme poder.', example: 'O servo trabalhava a terra do senhor feudal e pagava tributos em troca de proteção. Não era escravo (não era propriedade), mas tampouco era livre.', tip: 'ENEM frequentemente compara feudalismo com outras formas de organização social — foque nas relações de poder e trabalho.' },
        { id: 't43', title: 'Cruzadas e Islamismo', summary: 'Cruzadas (1096-1291): guerras santas para reconquistar Jerusalém. Islã surge no século VII com Maomé, expandindo-se rapidamente pela Ásia e África.', example: 'As Cruzadas trouxeram contato com o mundo islâmico, reintroduzindo textos gregos à Europa e contribuindo para o Renascimento.', tip: 'Não confunda: Islam ≠ árabe. Há muçulmanos não-árabes (Irã, Indonésia) e árabes não-muçulmanos.' },
      ],
    },
    {
      id: 'w1_hum_03', title: 'Renascimento e Reforma',
      topics: [
        { id: 't44', title: 'Renascimento', summary: 'Século XV-XVI. Retomada dos valores greco-romanos, valorização do ser humano (humanismo), avanço científico, arte realista. Contexto: burguesía italiana rica.', example: 'Leonardo da Vinci, Michelangelo, Galileu. O heliocentrismo de Copérnico (Terra gira em torno do Sol) quebrou o dogma medieval.', tip: 'Renascimento cultural ≠ Revolução Científica — são processos relacionados mas distintos. O ENEM separa os dois.' },
        { id: 't45', title: 'Reforma Protestante', summary: 'Martinho Lutero (1517) critica a venda de indulgências. Surgem protestantismo, calvinismo, anglicanismo. Contrarreforma católica em resposta.', example: 'A invenção da imprensa por Gutenberg (1450) foi fundamental para a Reforma — permitiu difundir a Bíblia traduzida para o povo.', tip: 'O ENEM relaciona Reforma Protestante com surgimento do capitalismo (Max Weber: "ética protestante e espírito do capitalismo").' },
      ],
    },
    {
      id: 'w1_hum_04', title: 'Geografia — Cartografia e Território',
      topics: [
        { id: 't46', title: 'Cartografia e projeções', summary: 'Mapas são representações do espaço. Toda projeção distorce algo: área, forma, distância ou direção. Mercator (mais usada) distorce tamanhos nas latitudes extremas.', example: 'No mapa de Mercator, a Groenlândia parece maior que a África — mas a África é 14x maior. Isso tem impacto político e cultural na percepção do mundo.', tip: 'O ENEM adora questões sobre como a escolha do mapa reflete visões de mundo e relações de poder.' },
        { id: 't47', title: 'Clima, vegetação e relevo', summary: 'Clima depende de latitude, altitude, continentalidade e correntes marítimas. Biomas brasileiros: Amazônia, Cerrado, Caatinga, Mata Atlântica, Pampa, Pantanal.', example: 'O Cerrado é o "berço das águas" do Brasil — suas raízes profundas alimentam os principais aquíferos e rios do país.', tip: 'A Caatinga é o único bioma exclusivamente brasileiro. O Pantanal é a maior planície alagável do mundo.' },
      ],
    },
  ],
}

const W1_NATUREZA: Kingdom = {
  id: 'w1_nat',
  name: 'Laboratório Oculto',
  subject: 'natureza',
  color: 0x4caf50,
  icon: '🔬',
  arenas: [
    {
      id: 'w1_nat_01', title: 'Química — Introdução',
      topics: [
        { id: 't50', title: 'Matéria e suas propriedades', summary: 'Matéria é tudo que tem massa e ocupa espaço. Propriedades físicas (cor, ponto de fusão) não alteram a composição. Propriedades químicas envolvem reações.', example: 'Fusão do gelo (H₂O) é propriedade física — a água continua sendo H₂O. Queima do papel é propriedade química — transforma em cinza e CO₂.', tip: 'Mudança de estado físico = propriedade física. Formação de nova substância = propriedade química.' },
        { id: 't51', title: 'Tabela Periódica', summary: 'Elementos organizados por número atômico crescente. Períodos (linhas): mesma quantidade de camadas. Grupos/famílias (colunas): mesmas propriedades químicas.', example: 'Grupo 1 (metais alcalinos): Li, Na, K — reagentes com água. Grupo 18 (gases nobres): He, Ne, Ar — inertes, não reagem.', tip: 'ENEM não pede decorar a tabela — ela é fornecida. Foque em entender tendências (eletronegatividade, raio atômico).' },
        { id: 't52', title: 'Ligações Químicas', summary: 'Iônica: metal + não-metal (doação de elétrons). Covalente: não-metal + não-metal (compartilha). Metálica: metal + metal (mar de elétrons).', example: 'NaCl (sal): iônica. H₂O (água): covalente polar. Fe (ferro): metálica.', tip: 'Substâncias iônicas: sólidas, alto ponto de fusão, conduzem eletricidade quando dissolvidas. Covalentes: geralmente gasosas ou líquidas.' },
      ],
    },
    {
      id: 'w1_nat_02', title: 'Biologia Celular',
      topics: [
        { id: 't53', title: 'Célula procariótica e eucariótica', summary: 'Procariótica: sem núcleo definido (bactérias). Eucariótica: com núcleo definido (animais, plantas, fungos).', example: 'Bactérias são procarióticas — por isso antibióticos podem agir nelas sem afetar nossas células eucarióticas.', tip: 'Vírus NÃO são células — são apenas material genético com proteínas. Não são vivos no sentido estrito.' },
        { id: 't54', title: 'Fotossíntese e respiração celular', summary: 'Fotossíntese: CO₂ + H₂O + luz → glicose + O₂ (cloroplasto). Respiração: glicose + O₂ → CO₂ + H₂O + ATP (mitocôndria).', example: 'Plantas fazem fotossíntese e respiração. De dia predomina fotossíntese (produz mais O₂ do que consome). À noite só respiração.', tip: 'O ENEM relaciona fotossíntese com ciclo do carbono e efeito estufa — amplie o conceito.' },
      ],
    },
    {
      id: 'w1_nat_03', title: 'Física — Cinemática',
      topics: [
        { id: 't55', title: 'Velocidade e aceleração', summary: 'Velocidade média: v = Δs/Δt (variação de espaço / variação de tempo). Aceleração: a = Δv/Δt (variação de velocidade / variação de tempo).', example: 'Um carro percorre 150 km em 2 horas. v = 150/2 = 75 km/h.', tip: 'Cuidado com unidades! O ENEM frequentemente mistura km/h com m/s. Conversão: divida por 3,6 (60 km/h = 60/3,6 ≈ 16,7 m/s).' },
        { id: 't56', title: 'Movimento Uniforme e Uniformemente Variado', summary: 'MU: velocidade constante, aceleração = 0. Equação: s = s₀ + vt. MUV: aceleração constante. Equações: v = v₀ + at e s = s₀ + v₀t + at²/2.', example: 'Carro a 20 m/s freia com a = -5 m/s². Quando para? v = 0: 0 = 20 - 5t → t = 4 s. Distância: s = 20(4) - 5(16)/2 = 80 - 40 = 40 m.', tip: 'Gráfico v×t: área = deslocamento. Gráfico s×t: inclinação = velocidade. O ENEM adora cobrar gráficos.' },
      ],
    },
  ],
}

// ─── MUNDO 2 — 2ª Série ──────────────────────────────────────────────────────

const W2_MATEMATICA: Kingdom = {
  id: 'w2_mat',
  name: 'Torre da Geometria',
  subject: 'matematica',
  color: 0x9c27b0,
  icon: '📐',
  arenas: [
    {
      id: 'w2_mat_01', title: 'Geometria Plana',
      topics: [
        { id: 't60', title: 'Triângulos e Teorema de Pitágoras', summary: 'Em triângulo retângulo: hipotenusa² = cateto₁² + cateto₂². Tipos: equilátero (3 lados iguais), isósceles (2 iguais), escaleno (todos diferentes).', example: 'Catetos 3 e 4: hipotenusa = √(9+16) = √25 = 5. Triângulo pitagórico famoso: 3-4-5.', tip: 'Os triângulos pitagóricos mais cobrados: 3-4-5, 5-12-13, 8-15-17. Vale a pena decorar.' },
        { id: 't61', title: 'Círculo e circunferência', summary: 'Circunferência = 2πr. Área do círculo = πr². π ≈ 3,14 (o ENEM geralmente dá o valor).', example: 'Roda com raio 7 cm. Circunferência = 2 × π × 7 ≈ 44 cm. Área = π × 49 ≈ 154 cm².', tip: 'Cuidado: diâmetro = 2r. Muitas questões dão o diâmetro mas pedem cálculos com o raio.' },
        { id: 't62', title: 'Áreas de polígonos', summary: 'Retângulo: b×h. Triângulo: b×h/2. Trapézio: (B+b)×h/2. Losango: D×d/2.', example: 'Trapézio com bases 8 e 4 m, altura 3 m. Área = (8+4)×3/2 = 18 m².', tip: 'O ENEM frequentemente apresenta figuras compostas — divida em formas simples e some as áreas.' },
      ],
    },
    {
      id: 'w2_mat_02', title: 'Geometria Espacial',
      topics: [
        { id: 't63', title: 'Prismas e cilindros', summary: 'Prisma: V = Abase × altura. Cilindro: V = πr²h. Área lateral do cilindro = 2πrh.', example: 'Caixa d\'água cilíndrica: r = 1 m, h = 2 m. V = π × 1 × 2 ≈ 6,28 m³ = 6.280 litros.', tip: 'Problemas de embalagem e capacidade são prismas ou cilindros. Identifique a base e a altura.' },
        { id: 't64', title: 'Pirâmides e cones', summary: 'Pirâmide: V = Abase × h / 3. Cone: V = πr²h / 3. Note o fator 1/3.', example: 'Cone de sorvete: r = 3 cm, h = 12 cm. V = π × 9 × 12 / 3 = 36π ≈ 113 cm³.', tip: 'Prisma e cilindro: fator 1. Pirâmide e cone: fator 1/3. Esfera: V = (4/3)πr³.' },
      ],
    },
    {
      id: 'w2_mat_03', title: 'Trigonometria',
      topics: [
        { id: 't65', title: 'Seno, cosseno e tangente', summary: 'No triângulo retângulo: sen = oposto/hipotenusa, cos = adjacente/hipotenusa, tg = oposto/adjacente. Mnemônico: SOH-CAH-TOA.', example: 'Ângulo de 30°: sen = 1/2, cos = √3/2, tg = 1/√3. Para 45°: sen = cos = √2/2, tg = 1.', tip: 'Tabela de 30°, 45°, 60° é frequentemente fornecida no ENEM — mas entender o significado é mais importante que decorar.' },
        { id: 't66', title: 'Trigonometria aplicada', summary: 'Lei dos senos: a/senA = b/senB. Lei dos cossenos: a² = b² + c² - 2bc·cosA. Usadas em triângulos não-retângulos.', example: 'Problema de altura de prédio com ângulo de elevação de 30° a 50 m de distância: h = 50 × tg(30°) = 50/√3 ≈ 28,9 m.', tip: 'Ângulos de elevação (olha para cima) e depressão (olha para baixo) são muito cobrados no ENEM com contexto real.' },
      ],
    },
    {
      id: 'w2_mat_04', title: 'Estatística e Probabilidade',
      topics: [
        { id: 't67', title: 'Média, mediana e moda', summary: 'Média: soma / quantidade. Mediana: valor central (ordene os dados). Moda: valor mais frequente.', example: 'Dados: 2, 3, 3, 7, 10. Média = 25/5 = 5. Mediana = 3 (central). Moda = 3 (mais frequente).', tip: 'A média é sensível a valores extremos (outliers). A mediana é mais representativa quando há discrepâncias — o ENEM explora isso.' },
        { id: 't68', title: 'Probabilidade básica', summary: 'P(evento) = casos favoráveis / casos possíveis. Varia de 0 (impossível) a 1 (certo).', example: 'Dado de 6 faces. P(número par) = 3/6 = 1/2 = 50%.', tip: 'Probabilidade de A E B (independentes): P(A) × P(B). Probabilidade de A OU B: P(A) + P(B) - P(A∩B).' },
        { id: 't69', title: 'Análise combinatória', summary: 'Arranjo (importa a ordem): A(n,p) = n!/(n-p)!. Combinação (não importa a ordem): C(n,p) = n!/[p!(n-p)!].', example: 'Quantas senhas de 3 dígitos distintos com {1,2,3,4,5}? Ordem importa: A(5,3) = 5×4×3 = 60.', tip: 'Pergunta-chave: "a ordem importa?" Sim → arranjo/permutação. Não → combinação.' },
      ],
    },
  ],
}

const W2_PORTUGUES: Kingdom = {
  id: 'w2_port',
  name: 'Biblioteca das Letras',
  subject: 'portugues',
  color: 0x4a90d9,
  icon: '✍️',
  arenas: [
    {
      id: 'w2_port_01', title: 'Argumentação e Redação',
      topics: [
        { id: 't70', title: 'Estrutura dissertativo-argumentativa', summary: 'Introdução (apresenta tema + tese) → Desenvolvimento (2 parágrafos com argumento + fundamentação + exemplo) → Conclusão (retoma tese + proposta de intervenção).', example: 'Tema: "Impacto das redes sociais na saúde mental." Tese: "O uso excessivo prejudica o bem-estar." Argumento 1: isolamento social. Argumento 2: comparação e ansiedade.', tip: 'A redação do ENEM tem 5 competências. Competência 3 (argumentação) e 5 (proposta de intervenção) têm maior peso na nota final.' },
        { id: 't71', title: 'Proposta de intervenção', summary: 'Deve ter: agente + ação + modo/meio + finalidade + detalhamento. Não pode ferir direitos humanos.', example: 'Agente: o Governo Federal. Ação: implementar campanhas. Modo: em parceria com escolas. Finalidade: conscientizar jovens. Detalhe: sobre o uso responsável de redes sociais.', tip: 'Sua proposta deve ser REALISTA e ESPECÍFICA. "O governo deve resolver o problema" → nota baixa. Detalhe o como.' },
      ],
    },
    {
      id: 'w2_port_02', title: 'Literatura Brasileira',
      topics: [
        { id: 't72', title: 'Romantismo Brasileiro', summary: 'Século XIX. Características: nacionalismo, idealização, sentimentalismo. Gerações: indianista (Gonçalves Dias), ultrarromântica (Álvares de Azevedo), condoreira (Castro Alves).', example: '"I-Juca Pirama" de Gonçalves Dias: indianismo, o índio idealizado como herói. "Navio Negreiro" de Castro Alves: denúncia da escravidão.', tip: 'O ENEM cobra mais o contexto histórico e a análise do texto do que a biografia dos autores.' },
        { id: 't73', title: 'Realismo e Naturalismo', summary: 'Final do século XIX. Realismo: crítica social objetiva, personagens complexos (Machado de Assis). Naturalismo: determinismo, instintos, classes baixas (Aluísio Azevedo).', example: '"Dom Casmurro" (Machado): narrador não confiável — Bentinho/Capitu. A ambiguidade é proposital. "O Cortiço" (Aluísio): retrata a degradação social no Rio do século XIX.', tip: 'O ENEM adora o narrador-personagem problemático de Machado de Assis — questione sempre o que ele diz.' },
        { id: 't74', title: 'Modernismo Brasileiro', summary: 'Semana de Arte Moderna (1922). 1ª fase: ruptura (Oswald, Mário de Andrade). 2ª fase: regionalismo e engajamento (Graciliano Ramos, Jorge Amado). 3ª fase: introspecção (Clarice Lispector, João Guimarães Rosa).', example: '"Macunaíma" (Mário de Andrade): anti-herói brasileiro, mistura de culturas, crítica à identidade nacional.', tip: '"Grande Sertão: Veredas" de Guimarães Rosa é cobrado por sua linguagem inovadora (neologismos, mistura de dialetos).' },
      ],
    },
  ],
}

const W2_HUMANAS: Kingdom = {
  id: 'w2_hum',
  name: 'Terras das Revoluções',
  subject: 'humanas',
  color: 0xe8a838,
  icon: '⚔️',
  arenas: [
    {
      id: 'w2_hum_01', title: 'Absolutismo e Iluminismo',
      topics: [
        { id: 't80', title: 'Absolutismo', summary: 'Séculos XVI-XVIII. Poder concentrado no rei, legitimado pela teoria do direito divino. Mercantilismo como política econômica.', example: 'Luís XIV da França: "O Estado sou eu." Controle total da nobreza, criação de Versalhes como símbolo de poder.', tip: 'Absolutismo ≠ totalitarismo. O rei absoluto ainda era limitado pela Igreja e pela tradição — o totalitário não tem limites.' },
        { id: 't81', title: 'Iluminismo', summary: 'Século XVIII. Valorização da razão, ciência e liberdade individual. Crítica à Igreja e ao absolutismo. Pensadores: Locke (contrato social), Montesquieu (separação dos poderes), Rousseau (vontade geral), Voltaire (tolerância).', example: 'A separação dos 3 poderes (Executivo, Legislativo, Judiciário) de Montesquieu está na Constituição brasileira até hoje.', tip: 'O ENEM relaciona o Iluminismo com as revoluções americana (1776) e francesa (1789) — causa e consequência.' },
      ],
    },
    {
      id: 'w2_hum_02', title: 'Revoluções e Brasil Colonial',
      topics: [
        { id: 't82', title: 'Revolução Francesa', summary: '1789. Causa: crise fiscal, desigualdade, ideias iluministas. Fases: Assembleia Nacional, Convenção Nacional (Terror), Diretório, Napoleão. Lema: Liberdade, Igualdade, Fraternidade.', example: 'A Declaração dos Direitos do Homem e do Cidadão (1789) influenciou constituições do mundo todo, incluindo o Brasil.', tip: 'O ENEM cobra o IMPACTO da Rev. Francesa (fim do feudalismo, direitos civis) mais do que a cronologia.' },
        { id: 't83', title: 'Brasil Colonial', summary: 'Pacto Colonial: exploração econômica da colônia em benefício da metrópole (Portugal). Ciclos: pau-brasil, açúcar, mineração, café. Escravidão como base da economia.', example: 'O Quilombo dos Palmares resistiu por quase um século (1600-1694). Zumbi simboliza a resistência negra.', tip: '"Entradas e Bandeiras" expandiram o território além do Tratado de Tordesilhas — base territorial do Brasil atual.' },
        { id: 't84', title: 'Revolução Industrial', summary: 'Inglaterra, séculos XVIII-XIX. Máquina a vapor, produção em série, êxodo rural, surgimento do proletariado, capitalismo industrial.', example: 'A exploração do trabalho gerou o movimento operário e, mais tarde, o socialismo e o marxismo como resposta.', tip: 'O ENEM relaciona Rev. Industrial com questões ambientais atuais (origem do aquecimento global) e desigualdade social.' },
      ],
    },
  ],
}

const W2_NATUREZA: Kingdom = {
  id: 'w2_nat',
  name: 'Forja dos Elementos',
  subject: 'natureza',
  color: 0x4caf50,
  icon: '⚗️',
  arenas: [
    {
      id: 'w2_nat_01', title: 'Física — Termologia e Óptica',
      topics: [
        { id: 't90', title: 'Temperatura e calor', summary: 'Temperatura mede agitação das moléculas. Calor é a energia transferida entre corpos de temperaturas diferentes. Escalas: Celsius (°C), Kelvin (K = °C + 273), Fahrenheit.', example: 'Convertendo 27°C para Kelvin: 27 + 273 = 300 K. Convertendo para Fahrenheit: (27 × 9/5) + 32 = 80,6°F.', tip: 'O ENEM cobra sempre a DIFERENÇA ΔT — que é a mesma em Celsius e Kelvin (mas não em Fahrenheit).' },
        { id: 't91', title: 'Óptica — reflexão e refração', summary: 'Reflexão: ângulo de incidência = ângulo de reflexão. Refração: mudança de velocidade ao mudar de meio, causa mudança de direção. Índice de refração: n = c/v.', example: 'Colher parece "quebrada" na água: refração. Espelho plano: imagem virtual, mesmo tamanho, lateralmente invertida.', tip: 'Miopia (foco antes da retina, lente divergente) e hipermetropia (foco após retina, lente convergente) — muito cobrado.' },
      ],
    },
    {
      id: 'w2_nat_02', title: 'Química — Reações',
      topics: [
        { id: 't92', title: 'Reações químicas e balanceamento', summary: 'Lei da Conservação da Massa (Lavoisier): a massa dos reagentes = massa dos produtos. Balanceamento: ajusta os coeficientes para equilibrar os átomos.', example: 'H₂ + O₂ → H₂O. Balanceando: 2H₂ + O₂ → 2H₂O. Agora: 4H + 2O nos dois lados. ✓', tip: 'Balanceie sempre em ordem: elementos metálicos, depois não-metálicos, hidrogênio e oxigênio por último.' },
        { id: 't93', title: 'Estequiometria', summary: 'Cálculo de quantidades em reações químicas usando proporções molares. 1 mol = 6×10²³ partículas (Avogadro). Massa molar = massa atômica em g/mol.', example: 'C + O₂ → CO₂. 12g de C reage com quantos gramas de O₂? Proporção 1:1 em mol. 12g C = 1 mol. Precisa de 1 mol O₂ = 32g.', tip: 'Monte sempre a proporção mol a mol a partir da equação balanceada, depois converta para massa/volume.' },
        { id: 't94', title: 'Soluções e pH', summary: 'Solução = soluto + solvente. Concentração molar: n/V. pH = -log[H⁺]. pH < 7: ácido. pH = 7: neutro. pH > 7: base.', example: 'Suco de limão pH ≈ 2 (ácido). Água pura pH = 7 (neutra). Água com sabão pH ≈ 10 (básico).', tip: 'pH cai 1 unidade = concentração de H⁺ aumenta 10×. O ENEM explora isso em contextos de chuva ácida e corpo humano.' },
      ],
    },
    {
      id: 'w2_nat_03', title: 'Biologia — Ecologia e Genética',
      topics: [
        { id: 't95', title: 'Ecologia', summary: 'Cadeia alimentar: produtor → consumidor primário → consumidor secundário → decompositores. Pirâmide de energia: 10% de energia passa para o próximo nível.', example: 'Grama → gafanhoto → rã → cobra → gavião. A cada nível se perde 90% de energia. Por isso carnívoros são mais raros.', tip: 'Quanto mais alto na cadeia, menor a biomassa e a quantidade de indivíduos — mas o ENEM pode inverter com pirâmides.' },
        { id: 't96', title: 'Genética Mendeliana', summary: '1ª Lei de Mendel (segregação): cada característica é determinada por 2 fatores que se separam na formação dos gametas. Dominante (A) mascara recessivo (a).', example: 'Cruzamento: Aa × Aa → AA (25%), Aa (50%), aa (25%). Fenótipo: 3 com A (dominante): 1 sem (recessivo).', tip: 'Daltonismo e hemofilia: ligados ao X, mais comum em homens (XY precisam de apenas 1 alelo afetado).' },
      ],
    },
  ],
}

// ─── MUNDO 3 — 3ª Série ──────────────────────────────────────────────────────

const W3_MATEMATICA: Kingdom = {
  id: 'w3_mat',
  name: 'Citadela da Álgebra',
  subject: 'matematica',
  color: 0x9c27b0,
  icon: '∑',
  arenas: [
    {
      id: 'w3_mat_01', title: 'Funções Exponenciais e Logarítmicas',
      topics: [
        { id: 't100', title: 'Função exponencial', summary: 'f(x) = aˣ. Se a > 1: crescente. Se 0 < a < 1: decrescente. Nunca toca o eixo x. Modela crescimento/decaimento: juros, população, radioatividade.', example: 'Bactéria duplica a cada hora. Começa com 100. Após t horas: N(t) = 100 × 2^t. Após 5h: 100 × 32 = 3.200 bactérias.', tip: 'Crescimento exponencial × linear: exponencial sempre "ganha" no longo prazo — o ENEM explora isso em contexto ambiental.' },
        { id: 't101', title: 'Logaritmos', summary: 'log_a(b) = x significa aˣ = b. Propriedades: log(A×B) = logA + logB. log(A/B) = logA - logB. log(Aⁿ) = n×logA.', example: 'log₂(8) = 3, pois 2³ = 8. log₁₀(1000) = 3, pois 10³ = 1000.', tip: 'Escala Richter (terremotos) e pH são logarítmicos — cada unidade representa uma variação de 10×. O ENEM contextualiza assim.' },
      ],
    },
    {
      id: 'w3_mat_02', title: 'Geometria Analítica',
      topics: [
        { id: 't102', title: 'Ponto, reta e distância', summary: 'Distância entre pontos: d = √[(x₂-x₁)² + (y₂-y₁)²]. Equação da reta: y = mx + b (m = inclinação, b = interseção com y).', example: 'Distância de A(1,2) a B(4,6): d = √[(4-1)² + (6-2)²] = √[9+16] = √25 = 5.', tip: 'Coeficiente angular m = Δy/Δx. Retas paralelas têm o mesmo m. Retas perpendiculares: m₁ × m₂ = -1.' },
        { id: 't103', title: 'Circunferência analítica', summary: '(x-a)² + (y-b)² = r². Centro (a,b), raio r.', example: 'Centro (2,-1), raio 3: (x-2)² + (y+1)² = 9. Para verificar se ponto (5,-1) está na circunferência: (5-2)² + (-1+1)² = 9 + 0 = 9. ✓', tip: 'Quando a equação vem na forma geral x²+y²+Dx+Ey+F=0, complete o quadrado para encontrar o centro e raio.' },
      ],
    },
    {
      id: 'w3_mat_03', title: 'Análise Combinatória Avançada',
      topics: [
        { id: 't104', title: 'Princípio Multiplicativo e Permutações', summary: 'Princípio multiplicativo: se uma escolha tem m opções e outra tem n opções, o total é m×n. Permutação de n elementos: P(n) = n!', example: '4 camisas e 3 calças: 4×3 = 12 combinações de roupa. Anagramas de "AMOR": P(4) = 4! = 24.', tip: 'Para anagramas com letras repetidas: divida por k! para cada letra repetida k vezes.' },
        { id: 't105', title: 'Binômio de Newton e probabilidade condicional', summary: 'Binômio: (a+b)ⁿ tem coeficientes C(n,k). Probabilidade condicional: P(A|B) = P(A∩B)/P(B).', example: 'P(tirar 2 bolas verdes de 3V e 2V em 2 tentativas sem reposição): P = 3/5 × 2/4 = 6/20 = 30%.', tip: 'O ENEM apresenta probabilidade condicional em contextos de saúde (testes diagnósticos com falso-positivo).' },
      ],
    },
  ],
}

const W3_HUMANAS: Kingdom = {
  id: 'w3_hum',
  name: 'Grande Teatro da História',
  subject: 'humanas',
  color: 0xe8a838,
  icon: '🌐',
  arenas: [
    {
      id: 'w3_hum_01', title: 'Guerras Mundiais e Brasil República',
      topics: [
        { id: 't110', title: '1ª Guerra Mundial', summary: '1914-1918. Causas: nacionalismo, imperialismo, militarismo, sistema de alianças. Estopim: assassinato do Arquiduque Francisco Fernando. Consequências: queda de impérios, Tratado de Versalhes.', example: 'O Tratado de Versalhes (1919) humilhou a Alemanha — levando ao ressentimento que alimentou o nazismo 20 anos depois.', tip: 'Fórmula MAIN (Militarismo, Alianças, Imperialismo, Nacionalismo) resume as causas da 1ª GM — usada pelo ENEM.' },
        { id: 't111', title: '2ª Guerra Mundial e Holocausto', summary: '1939-1945. Nazismo, fascismo, expansionismo. Holocausto: genocídio de 6 milhões de judeus e milhões de outros grupos.', example: 'A bomba atômica em Hiroshima e Nagasaki (1945) encerrou a guerra no Pacífico mas inaugurou a era nuclear e a Guerra Fria.', tip: 'O ENEM relaciona o Holocausto com direitos humanos e discriminação contemporânea — contextualize sempre.' },
        { id: 't112', title: 'Ditadura Militar Brasileira', summary: '1964-1985. Golpe civil-militar, AI-5 (1968), censura, tortura, exílio. Abertura gradual: Lei da Anistia (1979), Diretas Já (1984), Constituição de 1988.', example: 'A Constituição de 1988 ("Constituição Cidadã") foi uma reação direta aos abusos da ditadura — garantindo direitos fundamentais.', tip: 'O ENEM cobra o período em relação a direitos humanos e democracia — foco nas consequências e na redemocratização.' },
      ],
    },
    {
      id: 'w3_hum_02', title: 'Filosofia e Sociologia',
      topics: [
        { id: 't113', title: 'Filosofia Política', summary: 'Contrato Social: Hobbes (Estado forte para evitar o caos), Locke (proteger a propriedade e os direitos naturais), Rousseau (vontade geral do povo).', example: 'A democracia representativa baseia-se em Locke: o povo delega poder ao governo para proteger seus direitos. Se o governo falha, o povo pode revogá-lo.', tip: 'O ENEM frequentemente apresenta textos de Locke e Rousseau para questionar como legitimamos o poder político.' },
        { id: 't114', title: 'Sociologia — Classes e Desigualdade', summary: 'Marx: luta de classes (burguesia × proletariado). Weber: classe, status e poder. Durkheim: coesão social e anomia.', example: 'Anomia (Durkheim): situação de falta de normas sociais, como em períodos de crise — pode levar ao aumento da criminalidade e do suicídio.', tip: 'O ENEM usa os conceitos sociológicos para analisar problemas contemporâneos: desigualdade, racismo, violência.' },
      ],
    },
  ],
}

const W3_NATUREZA: Kingdom = {
  id: 'w3_nat',
  name: 'Reator Central',
  subject: 'natureza',
  color: 0x4caf50,
  icon: '⚡',
  arenas: [
    {
      id: 'w3_nat_01', title: 'Física — Eletricidade e Eletromagnetismo',
      topics: [
        { id: 't120', title: 'Corrente, tensão e resistência', summary: 'Lei de Ohm: V = R × I. Corrente I (amperes), Tensão V (volts), Resistência R (ohms). Potência: P = V × I = V²/R = I²R.', example: 'Chuveiro elétrico: 220V, 40A. P = 220 × 40 = 8.800 W = 8,8 kW. Em 1 hora: 8,8 kWh.', tip: 'Resistores em série: soma as resistências. Em paralelo: 1/Req = 1/R₁ + 1/R₂. O ENEM adora problemas de conta de luz.' },
        { id: 't121', title: 'Eletromagnetismo', summary: 'Corrente elétrica cria campo magnético (Oersted). Campo magnético variável cria corrente (indução, Faraday). Base do gerador e do motor elétrico.', example: 'Usina hidrelétrica: água move turbina → rotação cria campo magnético variável → induz corrente elétrica (gerador).', tip: 'Transformador: V₁/V₂ = N₁/N₂. Se N₁ > N₂: abaixa a tensão. Usado para transmitir eletricidade em alta tensão (menos perdas).' },
      ],
    },
    {
      id: 'w3_nat_02', title: 'Química Orgânica',
      topics: [
        { id: 't122', title: 'Hidrocarbonetos e funções orgânicas', summary: 'Carbono faz 4 ligações. Alcanos (só C-C), Alcenos (dupla), Alcinos (tripla). Funções: álcool (-OH), ácido carboxílico (-COOH), éster, amina, cetona.', example: 'Etanol (C₂H₅OH): álcool, combustível e desinfetante. Ácido acético (CH₃COOH): ácido carboxílico, é o vinagre.', tip: 'O ENEM contextualiza química orgânica com combustíveis, medicamentos e alimentos — foque nos grupos funcionais e propriedades.' },
        { id: 't123', title: 'Reações orgânicas e polímeros', summary: 'Adição (quebra dupla ligação), substituição, eliminação, saponificação (éster + base → sabão). Polímeros: macromoléculas formadas por monômeros repetidos.', example: 'PET (garrafas): polimerização do etileno + ácido tereftálico. Nylon: poliamida. Borracha vulcanizada: poliisopreno + enxofre.', tip: 'A saponificação (fabricação de sabão) é um clássico do ENEM — gordura + NaOH → sabão + glicerina.' },
      ],
    },
    {
      id: 'w3_nat_03', title: 'Biologia — Genética Molecular e Evolução',
      topics: [
        { id: 't124', title: 'DNA, RNA e síntese proteica', summary: 'DNA: dupla hélice, bases A-T e C-G. Transcrição: DNA → mRNA. Tradução: mRNA → proteína (no ribossomo, via tRNA).', example: 'Mutação no DNA pode alterar uma proteína: ex. hemoglobina anormal → anemia falciforme. Uma base diferente, uma doença.', tip: 'PCR (usada em testes de COVID) e CRISPR (edição genética) partem dos mesmos princípios — o ENEM contextualiza biotecnologia.' },
        { id: 't125', title: 'Evolução e Seleção Natural', summary: 'Darwin: variação + seleção natural + tempo = evolução. Indivíduos mais adaptados sobrevivem e reproduzem mais. Espécies surgem por isolamento reprodutivo.', example: 'Bactérias resistentes a antibióticos: as resistentes survivem ao antibiótico e reproduzem — a resistência se dissemina. Evolução em tempo real.', tip: 'Lamarck (uso/desuso) ≠ Darwin (seleção). O ENEM frequentemente pede que você diferencie os dois mecanismos.' },
      ],
    },
  ],
}

const W3_PORTUGUES: Kingdom = {
  id: 'w3_port',
  name: 'Salão da Redação',
  subject: 'portugues',
  color: 0x4a90d9,
  icon: '🎓',
  arenas: [
    {
      id: 'w3_port_01', title: 'Redação ENEM — Competências',
      topics: [
        { id: 't130', title: 'Competência 1 — Norma culta', summary: 'Demonstrar domínio da norma culta: concordância, regência, pontuação, ortografia. Erros graves = desconto de 40 pontos por desvio.', example: 'Evite: "a gente vamos", "eu vi ele", "menas". Prefira: "nós vamos", "eu o vi", "menos".', tip: 'Não tente usar construções que você não domina — escreva de forma clara e correta dentro do que sabe.' },
        { id: 't131', title: 'Competência 5 — Proposta de intervenção', summary: 'A proposta deve ser detalhada, respeitar direitos humanos e ter: agente + ação + modo + finalidade.', example: 'Ruim: "O governo deve combater a violência." Bom: "O Ministério da Educação deve implementar programas de mediação de conflitos nas escolas públicas, por meio de capacitação de professores, visando à redução da violência escolar."', tip: 'Nunca proponha violência, discriminação ou restrição de direitos — nota 0 na comp. 5 e possível zerar a redação.' },
      ],
    },
  ],
}

const W3_INGLES: Kingdom = {
  id: 'w3_ing',
  name: 'Mundo Além',
  subject: 'ingles',
  color: 0x00bcd4,
  icon: '🗺️',
  arenas: [
    {
      id: 'w3_ing_01', title: 'Interpretação Avançada',
      topics: [
        { id: 't135', title: 'Textos acadêmicos e científicos', summary: 'Textos do ENEM frequentemente são artigos, reportagens e ensaios em inglês. Estratégia: leia o título, subtítulo, primeiro e último parágrafo, e as questões antes do texto.', example: 'Abstract científico tem estrutura: Background → Objetivo → Métodos → Resultados → Conclusão. Identifique cada parte para responder às questões.', tip: 'O ENEM não cobra tradução literal — cobra interpretação. Palavras desconhecidas podem ser inferidas pelo contexto.' },
        { id: 't136', title: 'Humor, ironia e crítica em inglês', summary: 'Cartuns, tirinhas e memes aparecem no ENEM em inglês. A piada ou crítica geralmente depende de conhecimento cultural ou duplo sentido.', example: 'Uma tirinha com "Fast food" e um atleta pode criticar o sedentarismo. O humor está no contraste — identifique a contradição.', tip: 'Quando o texto em inglês tem humor, procure o elemento incongruente — é ele que carrega o significado da questão.' },
      ],
    },
  ],
}

// ─── EXPORT PRINCIPAL ─────────────────────────────────────────────────────────

export const WORLDS: World[] = [
  {
    id: 'world_1',
    name: '1ª Série — Fundações',
    serie: 1,
    kingdoms: [W1_MATEMATICA, W1_PORTUGUES, W1_INGLES, W1_HUMANAS, W1_NATUREZA],
  },
  {
    id: 'world_2',
    name: '2ª Série — Expansão',
    serie: 2,
    kingdoms: [W2_MATEMATICA, W2_PORTUGUES, W2_HUMANAS, W2_NATUREZA],
  },
  {
    id: 'world_3',
    name: '3ª Série — Domínio',
    serie: 3,
    kingdoms: [W3_MATEMATICA, W3_PORTUGUES, W3_INGLES, W3_HUMANAS, W3_NATUREZA],
  },
]

export function getWorld(worldId: string) {
  return WORLDS.find(w => w.id === worldId)
}

export function getKingdom(kingdomId: string) {
  for (const w of WORLDS) {
    const k = w.kingdoms.find(k => k.id === kingdomId)
    if (k) return k
  }
  return null
}

export function getArena(arenaId: string) {
  for (const w of WORLDS) {
    for (const k of w.kingdoms) {
      const a = k.arenas.find(a => a.id === arenaId)
      if (a) return a
    }
  }
  return null
}
