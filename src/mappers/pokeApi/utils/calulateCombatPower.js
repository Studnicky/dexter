const levelMultiplier = require('../config/levelMultiplier');

// The actual value of each of your Pokémon's stats is given by the formula (base stat + IV) * level multiplier;
module.exports = function calulateCombatPower(statsPKGO, level) {
	const low = Math.round((statsPKGO.attack * Math.sqrt(statsPKGO.defense) * Math.sqrt(statsPKGO.stamina) * levelMultiplier[level] * levelMultiplier[level]) / 10);
	const high = Math.round(((statsPKGO.attack + 15) * Math.sqrt(statsPKGO.defense + 15) * Math.sqrt(statsPKGO.stamina + 15) * levelMultiplier[level] * levelMultiplier[level]) / 10);

	return {
		low: Math.max(low, 10),
		high: Math.max(high, 10)
	};
};
