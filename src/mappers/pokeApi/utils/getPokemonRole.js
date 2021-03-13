module.exports = function getPokemonRole(statsPKGO) {
	let role = 'Average';
	const ratio = (statsPKGO.attack * statsPKGO.attack) / (statsPKGO.defense * statsPKGO.stamina);
	if (ratio > 1 / 3 + 1) {
		role = 'Attacker';
	} else if (ratio < 0.5) {
		role = 'Defender';
	}
	return role;
};
