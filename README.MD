# Clima

Aplicação web para consultar as condições meteorológicas atuais de uma cidade. Os dados são fornecidos pela [Open-Meteo](https://open-meteo.com/).

**Acesse o site:** https://estevao7.github.io/projeto-clima/

## Funcionalidades

- Busca de cidades pelo nome (com Enter ou clique no botão).
- Exibição de temperatura, sensação térmica, umidade, probabilidade de precipitação e vento (velocidade, direção em graus e ponto cardinal).
- Descrição das condições climáticas em português.
- Indicação de dia ou noite, com ícone, e data no fuso horário da cidade pesquisada.
- Três estados de tela: vazio, carregando e resultado.
- Layout responsivo para desktop e mobile.

## Tecnologias

- TypeScript
- Vite
- Open-Meteo Geocoding API e Forecast API
- GitHub Actions e GitHub Pages (publicação)

## Decisões técnicas

- **API isolada em um único módulo.** Toda a comunicação com a Open-Meteo fica em `openMeteo.ts`, em vez de espalhar `fetch` por vários arquivos. Se a API mudar, só esse arquivo precisa ser alterado.
- **Uma única função para a tela chamar.** A função `searchWeather` coordena as duas requisições (primeiro a cidade, depois o clima) e devolve uma ficha só, em vez de deixar a tela fazer as duas buscas. A tela faz um pedido e recebe o resultado pronto ou `null`.
- **Falhas voltam para o mesmo estado vazio.** Qualquer problema na busca (cidade não encontrada, falha de rede, resposta incompleta) leva ao mesmo estado vazio, em vez de mostrar mensagens de erro diferentes, para manter a interface simples nesta primeira versão. Mensagens específicas são uma melhoria planejada.

## Como foi desenvolvido

O projeto foi construído com apoio de IA, seguindo um PRD e uma lista de tasks incrementais, disponíveis na pasta [`.docs/`](./.docs). Depois de concluído, revisei o código para entender cada parte: os tipos, as conferências de dados, o fluxo da busca até a tela e o controle dos estados.

## Executar localmente

Requer Node.js 22 e npm.

```bash
npm ci
npm run dev
```

O Vite exibirá no terminal o endereço local para abrir no navegador.

## Build de produção

```bash
npm run build
npm run preview
```

Os arquivos gerados ficam na pasta `dist/`.

## Publicação no GitHub Pages

O workflow `deploy.yml` cria o build e publica o site automaticamente quando há um push para a branch `main`. Também é possível iniciar a publicação manualmente pela aba Actions do GitHub.

Em Settings → Pages, configure a origem como GitHub Actions.
