module.exports = async function fetchEvolutionChain(state) {
	const { pokemon } = this.getArgsFromState(state);

	const [species, stats] = await Promise.all([this._pokeApiAdapter.pokemonSpecies(pokemon[0]), this._pokeApiAdapter.pokemon(pokemon[0])]);
	const evolutions = await this._pokeApiAdapter.pokemonSpeciesEvolutionChain(species);

	const mappedResponse = this._pokeApiMapper.evolutions[state.event.platformName](species, stats, evolutions);
	return mappedResponse;
};
