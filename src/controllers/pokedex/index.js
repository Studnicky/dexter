const pokeApiAdapter = require('../../adapters/pokeapi');
const pokeApiMapper = require('../../mappers/pokeApi');
const logger = require('../../logger');
const methods = require('./methods');

const defaultConfig = {
	debug: true
};
class PokedexController {
	constructor(options = defaultConfig) {
		this.config = { ...defaultConfig, ...options };
		this.logger = this.config.debug ? logger.active : logger.silent;
		this._pokeApiAdapter = new pokeApiAdapter();
		this._pokeApiMapper = new pokeApiMapper();
	}
}

PokedexController.prototype.getArgsFromState = methods.getArgsFromState;
PokedexController.prototype.fetchEvolutionChain = methods.fetchEvolutionChain;
PokedexController.prototype.fetchFamily = methods.fetchFamily;
PokedexController.prototype.fetchDefenseSpread = methods.fetchDefenseSpread;
PokedexController.prototype.fetchOffenseSpread = methods.fetchOffenseSpread;
PokedexController.prototype.fetchStats = methods.fetchStats;
PokedexController.prototype.fetchTypes = methods.fetchTypes;

module.exports = PokedexController;
