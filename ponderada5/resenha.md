# Ponderada 5 - Resenha sobre o artigo
A partir da leitura do Artigo "Machine learning for internet of things data analysis: a survey", podemos traçar comparativos entre os conceitos nele apresentados, as atividades ponderadas e o projeto desenvolvido durante o módulo. Nesse contexto, podemos evidenciar tópicos:

## IoT, Smart Data e Dados

Segundo o artigo, o propósito da Internet of Things (IoT) é desenvolver ambientes inteligentes e simplificar o estilo de vida ao poupar tempo, energia e dinheiro, conscintindo em dispositivos conectados uns aos outros para aprimorar suas performaces. Dessa forma, o processo de coletar dados através de sensores, extrair informações a partir deles e, por fim transferir esse conhecimento para outros objetos, dispoitivos e servidores é fundamental. Nesse contexto, um cenário especificado é a aplicação dessas tecnologias para a redução de custos dentro de uma empresa, que relaciona-se diretamente com o projeto do módulo. Além disso, há a explicação de protocolos de comunicação (D2D, D2S, S2S), que correspondem a uma parte do transporte dos dados, e o destaque do processamento e preparação dos dados (Analytics at the edge, stream analisys, IoT analysis at the database) para reforçar as diferentes necessidades de um projeto. No nosso caso em particular, é importante destacar o Cloud Computing, que embora não seja a maneira primária de computação do treinamento dos modelos, pode ser uma alternativa.

Smart Data: Por ser de extrema importância para gerar bons insights, a qualidade dos dados deve ser garantida. Devido ao grande volume de dados brutos não necessariamente úteis ou preparados para análise, deve-se construir uma camada de abstração a mais (feature engeneering), bem como garantir a segurança dos dados (JWT, por exemplo) para torná-los mais inteligentes.

## Smart city
O artigo exemplifica diversos conceitos e vantagens do uso do IoT a partir de cidades inteligentes. Embora não seja diretamente relacionado, podemos traçar alguns paralelos com o projeto desenvolvido:

- Smart Energy: Reduzir o consume de energia geral através da medição de sensores. (Consequência direta)
- Smart Mobility: Efeitos diversos na forma de rodar veículos, principalmente ao monitorar sua performance. (Objetivo principal)
- Urban Planning: Ajudar em decisões de longo-prazo. Ao coletar dados de diferentes fontes, é possível fazer decisões para o futuro e  predições para problemas potenciais. (Consequência direta)
- Smart city data characteristhics: Gera dados de maneira contínua e volumosa. Processar os dados com diferentes fontes, frequências e intregá-los conscistentemente e com qualidade pode ser desafiador. (Característica dos dados disponibilizados)
- Quality of Information (QoI): Necessidade de extrair níveis mais altos de abstração e prover informações acionávies para outros serviços. Selecionar fontes confiáveis e combina-los é de suma importância. (Processo)

## Taxonomia dos algoritmos de machine learning
Devido à geração massiva de dados por diferentes fontes, é importante garantir a manuseabilidade de suas características a fim de garantir que algoritmos de machine learning sejam aplicados no escopo de smart data em projetos IoT. Em ambos projeto e atividades ponderadas, modelos de machine learning estavam presentes e a utilização pontual dependia diretamente da finalidade e característica dos dados. As abordagens foram majoritariamente para aprendizado supervisionado e explorou-se diversas opções de modelos e ferramentas.

Nesse contexto, trabalhamos com abordagens de séries temporais, aplicando conceitos. Não necessariamente todos os testes deram certo, mas constituiram experiências interessantes. A seguir, destaco alguns dos conceitos mais importantes:

- Regressão Linear: Utilizado na predição de visualizações de um canal nas atividades ponderadas. 
- Exponential Smoothing: Método que utiliza séries temporais, aplicando pesos maiores à dados mais recentes. Ideal para forecast de valores imediatos.
- Sliding-window method: Citado no artigo na sessão de séries temporais, é um dos principais componentes das análises do grupo. Consciste na aplicação de uma janela de tempo para determinar o comportamento de uma falha.

- Pycaret: Ferramenta que possibilitou a aplicação de todo o ciclo da criação de um modelo rapidamente.
- Prophet: Framework open-source do Facebook, é uma das ferramentas utilizadas para de realizar previsões em séries temporais. 

## Conclusões
O artigo conclui que para extrair conhecimento dos dados coletados, vários algorítmos podem ser aplicados. Escolher um algoritmo adequado para aplicações IoT específicas é um tópico importante, sendo que diferentes aplicações possuem diferentes características, com dados com propriedades distintas a serem consideradas e a taxonomia é outro faotr importante na aplicação de análise de dados pata smart data.

Da mesma forma, é possível obter essas noções no escopo prático do projeto, uma vez que o contexto é objetivamente parecido e os processos que levam à construção da aplicação final são constituídos pela utilização dos pontos evidenciados. Inclusivamente, as atividades ponderadas, embora num contexto mais simples, também apresentam um nível de complexidade que exige os conhecimentos apresentados no artigo.