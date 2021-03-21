module.exports = async function fetchOffenseSpread(state) {
	const { pokemon } = this.getArgsFromState(state);
	const pokemonSpecies = await this._pokeApiAdapter.pokemon(pokemon[0]);

	const types = _getTypeNames(pokemonSpecies);

	const typeSpread = await this._pokeApiAdapter.types(types);

	const mappedResponse = this._pokeApiMapper.offense[state.event.platformName](pokemonSpecies, typeSpread);

	return mappedResponse;
};

function _getTypeNames(pokemonSpecies) {
	return pokemonSpecies.types.map((typeObject) => {
		return typeObject.type.name;
	});
}
