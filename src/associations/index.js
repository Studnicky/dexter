const { numbers, names } = require('./config');
const { combatType } = require('game-master');
const typeStrings = Object.keys(combatType);
const pokemonStrings = [...numbers, ...names];

const pokedex = ['pokédex', 'pokedex', 'dex', ...pokemonStrings];
const stats = ['pokémon', 'poké', 'pokemon', 'poke', 'mon', 'statistics', 'stats', 'stat', ...pokemonStrings];
const types = ['type', 'types', 'counters', 'effective', , 'pvp', ...typeStrings];
const evolutions = ['evolutions', 'evolution', 'evolves', 'evolve', 'family', 'fam', ...pokemonStrings];
// const counters = ['counters', 'counter', 'weaknesses', 'weakness', 'resistances', 'resist'];

//	This keyword association effectively acts as both the enable toggle, and the matcher
module.exports = [
	{ controller: 'pokedex', method: 'fetchStats', keywords: [...pokedex, ...stats] },
	{ controller: 'pokedex', method: 'fetchTypes', keywords: [...pokedex, ...types] },
	{ controller: 'pokedex', method: 'fetchEvolutionChain', keywords: [...pokedex, ...evolutions] }
	// { controller: 'pokedex', method: 'fetchSpecies', keywords: [...pokedex, ...stats] },
];
