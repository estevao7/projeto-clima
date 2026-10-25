# Clima

Aplicação web para consultar as condições meteorológicas atuais de uma cidade. Os dados são fornecidos pela [Open-Meteo](https://open-meteo.com/).

## Funcionalidades

- Busca de cidades.
- Exibição de temperatura, sensação térmica, umidade, probabilidade de precipitação e vento.
- Descrição das condições climáticas em português.

## Tecnologias

- TypeScript
- Vite
- Open-Meteo Geocoding API e Forecast API

## Executar localmente

Requer Node.js 22 e npm.

```sh
npm ci
npm run dev
```

O Vite exibirá no terminal o endereço local para abrir no navegador.

## Build de produção

```sh
npm run build
npm run preview
```

Os arquivos gerados ficam na pasta `dist/`.

## Publicação no GitHub Pages

O workflow [deploy.yml](./.github/workflows/deploy.yml) cria o build e publica o site automaticamente quando há um push para a branch `main`. Também é possível iniciar a publicação manualmente pela aba **Actions** do GitHub.

Em **Settings → Pages**, configure a origem como **GitHub Actions**. O site publicado estará disponível em:

<https://estevao7.github.io/projeto-clima/>
