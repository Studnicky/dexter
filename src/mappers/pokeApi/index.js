const Mapper = require('../mapper');
const methods = require('./methods');

const defaultConfig = {
	debug: true
};
class PokeapiMapper extends Mapper {
	constructor(options = defaultConfig) {
		super('pokeapi', { ...defaultConfig, ...options });
	}
}

PokeapiMapper.prototype.evolutions = methods.evolutions;
PokeapiMapper.prototype.family = methods.family;
PokeapiMapper.prototype.defense = methods.defense;
PokeapiMapper.prototype.offense = methods.offense;
PokeapiMapper.prototype.stats = methods.stats;
PokeapiMapper.prototype.types = methods.types;

module.exports = PokeapiMapper;
