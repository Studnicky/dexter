const Discord = require('discord.js');
const config = require('../../../../config');
const utils = require('../utils');
const { calulateCombatPower } = require('../utils');

const breakpointsMap = {
	'Fifteen [hatch]': 15,
	'Twenty [raid]': 20,
	'Forty': 40
};

const leagueMap = {
	3: 'Master',
	2: 'Ultra',
	1: 'Great',
	0: 'Not PVP Viable'
};

function convertToPokemonGoStats(stats) {
	//	The higher of the attack stats is weighted at 7/8, the lower at 1/8
	const higherAttack = (Math.max(stats['attack'], stats['special-attack']) * 7) / 8;
	const lowerAttack = (Math.min(stats['attack'], stats['special-attack']) * 1) / 8;
	//	The higher of the defense stats is weighted at 5/8, the lower at 3/8
	const higherDefense = (Math.max(stats['attack'], stats['special-attack']) * 5) / 8;
	const lowerDefense = (Math.min(stats['attack'], stats['special-attack']) * 3) / 8;
	//	Speed is used by attack and defense
	const speedMultipler = (stats['speed'] - 75) / 500 + 1;

	return {
		attack: Math.round(speedMultipler * Math.round(2 * (higherAttack + lowerAttack))),
		defense: Math.round(speedMultipler * Math.round(2 * (higherDefense + lowerDefense))),
		stamina: Math.floor(stats['hp'] * 1.75 + 50)
	};
}

function discord(pokemon) {
	const stats = pokemon.stats.reduce((statsObject, stat) => {
		statsObject[stat.stat.name] = stat.base_stat;
		return statsObject;
	}, {});

	const statsPKGO = convertToPokemonGoStats(stats);
	const total = statsPKGO.attack + statsPKGO.defense + statsPKGO.stamina;
	const league = leagueMap[Math.floor(total / 225)];
	const role = utils.getPokemonRole(statsPKGO);

	const typesObject = {
		primary: pokemon.types.find((type) => {
			return type.slot === 1;
		})['type']['name'],
		title: `Type${pokemon.types.length > 1 ? 's' : ''}`,
		body: pokemon.types
			.map((type) => {
				return utils.toCap(type.type.name);
			})
			.join(', ')
	};
	const embed = new Discord.MessageEmbed()
		.setTitle(`${utils.toCap(pokemon.name)} base stats:`)
		.setThumbnail(pokemon.sprites.front_default)
		.setColor(config.theme.typeToColor[typesObject.primary]['color'])
		.setFooter(`CP values are approximated from Pokeapi`, 'https://pokeapi.co/')
		.setTimestamp();

	embed.addField(typesObject.title, typesObject.body, true);
	embed.addField('Role', role, true);
	embed.addField('League', league, true);

	for (const [name, stat] of Object.entries(statsPKGO)) {
		const title = utils.toCap(name);
		embed.addField(title, stat, true);
	}

	for (const [name, level] of Object.entries(breakpointsMap)) {
		const { high, low } = calulateCombatPower(statsPKGO, level);
		const title = utils.toCap(name);
		const body = `${low} to ${high}`;
		embed.addField(title, body, true);
	}

	return { embed };
}

module.exports = {
	discord
};
