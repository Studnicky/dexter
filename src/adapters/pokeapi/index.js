const logger = require('../../logger');
const methods = require('./methods');

const defaultConfig = {
	debug: true
};
class Pokeapi {
	constructor(options = defaultConfig) {
		this.config = { ...defaultConfig, ...options };
		this.logger = this.config.debug ? logger.active : logger.silent;
	}
}

Pokeapi.prototype.pokemon = methods.pokemon;
Pokeapi.prototype.pokemonSpecies = methods.pokemonSpecies;
Pokeapi.prototype.pokemonSpeciesEvolutionChain = methods.pokemonSpeciesEvolutionChain;
Pokeapi.prototype.types = methods.types;

module.exports = Pokeapi;
