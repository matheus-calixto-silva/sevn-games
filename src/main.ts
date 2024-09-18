import { SvgIcon } from './components/SvgIcon.ts';
import type { IRound } from './interfaces/IRound.ts';
import { getApiData } from './services/api.ts';
import './style.css';

let currentRound = 0;
let apiRounds: IRound[] = [];

const svgColors = [
  '#FF0000', // Vermelho
  '#00FF00', // Verde
  '#0000FF', // Azul
  '#FFFF00', // Amarelo
  '#FF00FF', // Magenta
  '#00FFFF', // Ciano
  '#FFA500', // Laranja
  '#800080', // Roxo
  '#A52A2A', // Marrom
  '#808080', // Cinza
];

let colorIndex = 0;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section>
  <header class="header">
    <h1>SEVN ESPORTES ⚽</h1>
  </header>

  <main class="content">
    <h2>Confira as rodadas do nosso campeonato fictício!</h2>

    <div class="match-card">

      <div class="matches" id="matches">
      <div class="matches-header">
        <button class="nav-button" id="prev">&lt;</button>
        <div>
          <h3>Rodadas de Jogos</h3>
          <h4 id="round">RODADA ${currentRound}</h4>
        </div>
      <button class="nav-button" id="next">&gt;</button>
      </div>
        <div id="match-list">
        </div>
    </div>
  </main>
</section>
`;

function updateSvgColor() {
  const svgPaths = document.querySelectorAll('svg path');

  svgPaths.forEach((path, index) => {
    path.setAttribute(
      'fill',
      svgColors[(colorIndex + index) % svgColors.length]
    );
  });
}

function renderMatches(roundIndex: number) {
  const roundData = apiRounds[roundIndex];

  document.getElementById('round')!.innerText = `RODADA ${roundData.round}`;

  const matchListHTML = roundData.games
    .map(
      (match) => `
    <div class="match">
      <div class="team left">
        ${SvgIcon(svgColors[colorIndex])}
        <span>${match.team_home_name}</span>
      </div>
      <div class="score">
        <span>${match.team_home_score}</span> x <span>${
        match.team_away_score
      }</span>
      </div>
      <div class="team right">
      <span>${match.team_away_name}</span>
        ${SvgIcon(svgColors[colorIndex])}
      </div>
    </div>
  `
    )
    .join('');

  document.getElementById('match-list')!.innerHTML = matchListHTML;

  updateSvgColor();

  colorIndex = (colorIndex + 1) % svgColors.length;
}

document.getElementById('next')!.addEventListener('click', () => {
  if (currentRound < apiRounds.length - 1) {
    currentRound++;
    renderMatches(currentRound);
  }
});

document.getElementById('prev')!.addEventListener('click', () => {
  if (currentRound > 0) {
    currentRound--;
    renderMatches(currentRound);
  }
});

async function loadMatches() {
  apiRounds = await getApiData();
  renderMatches(currentRound);
}

loadMatches();
