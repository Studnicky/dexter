module.exports = async function fetchTypes(state) {
	const { types } = this.getArgsFromState(state);

	const response = await this._pokeApiAdapter.types(types);

	const mappedResponse = this._pokeApiMapper.types[state.event.platformName](response);

	return mappedResponse;
};
