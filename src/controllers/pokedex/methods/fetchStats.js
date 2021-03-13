module.exports = async function fetchStats(state) {
	const { pokemon } = this.getArgsFromState(state);
	const species = await this._pokeApiAdapter.pokemon(pokemon[0]);
	const mappedResponse = this._pokeApiMapper.stats[state.event.platformName](species);

	return mappedResponse;
};
