const Discord = require('discord.js');
const config = require('../../../../config');
const utils = require('../utils');
const { splitObjectListByField, sortObjectListByField } = require('../utils');

const types = [
	'normal',
	'flying',
	'poison',
	'ground',
	'bug',
	'dark',
	'ghost',
	'water',
	'grass',
	'electric',
	'psychic',
	'dragon',
	'ice',
	'fairy',
	'fighting',
	'rock',
	'steel',
	'fire'
];

const defenseValueMap = {
	'0.391': 'very strong',
	'0.625': 'strong',
	'1.000': 'neutral',
	'1.600': 'weak',
	'2.560': 'very weak'
};

const offenseValeMap = {
	'0.391': 'very weak',
	'0.625': 'weak',
	'1.000': 'neutral',
	'1.600': 'strong',
	'2.560': 'very strong'
};

const relationKeyMap = {
	double_damage_from: { category: 'defense', relation: 'weak', value: 1.6 },
	half_damage_from: { category: 'defense', relation: 'strong', value: 0.625 },
	no_damage_from: { category: 'defense', relation: 'negated', value: 0.390625 },
	double_damage_to: { category: 'offense', relation: 'strong', value: 1.6 },
	half_damage_to: { category: 'offense', relation: 'weak', value: 0.625 },
	no_damage_to: { category: 'offense', relation: 'negated', value: 0.390625 }
};
function multiplyValues(matches) {
	let mergedValue = 1;
	for (const { value } of matches) {
		mergedValue *= value;
	}
	return mergedValue.toFixed(3);
}
function mergeDefenseRelations(typeRelationsList) {
	const typeRelations = types.reduce((typeRelation, type) => {
		const matches = typeRelationsList.filter((relation) => {
			return type === relation.name;
		});
		if (matches.length) {
			const value = multiplyValues(matches);
			const desc = defenseValueMap[value];
			if (desc !== 'neutral') {
				typeRelation.push({ name: type, value: value, desc: defenseValueMap[value] });
			}
		}
		return typeRelation;
	}, []);

	return typeRelations;
}

function convertToPKGORelations(type) {
	const { name: source, damage_relations: relations } = type;
	const relationsPKGO = Object.entries(relations).reduce((sortedRelations, [key, types]) => {
		const typeRelationship = relationKeyMap[key];
		const mappedTypes = types.map((type) => {
			return {
				...typeRelationship,
				source,
				name: type.name
			};
		});
		return sortedRelations.concat(mappedTypes);
	}, []);

	return relationsPKGO;
}
function discord(types) {
	const typeRelationsList = types.map(convertToPKGORelations).flat();
	const { offense, defense } = splitObjectListByField(typeRelationsList, 'category');

	const defenseObject = mergeDefenseRelations(defense);
	const splitDefenseObject = splitObjectListByField(defenseObject, 'value');
	const offenseObject = splitObjectListByField(offense, 'source');

	const typesObject = {
		primary: types[0].name,
		title: `Type details: ${sortObjectListByField(types, 'name')
			.sort()
			.map((type) => {
				return utils.toCap(type.name);
			})
			.join(' & ')}`
	};

	const icon = `https://github.com/PokeMiners/pogo_assets/blob/master/Images/Types/POKEMON_TYPE_${typesObject.primary.toUpperCase()}.png?raw=true`;

	const embed = new Discord.MessageEmbed()
		.setTitle(`${typesObject.title}`)
		.setThumbnail(icon)
		.setColor(config.theme.typeToColor[typesObject.primary]['color'])
		.setFooter(`Provided by Pokeapi`, 'https://pokeapi.co/')
		.setTimestamp();

	for (const [name, types] of Object.entries(splitDefenseObject)) {
		const title = `${utils.toCap(defenseValueMap[name])} defense against:`;
		const body = sortObjectListByField(types, 'name')
			.map((type) => {
				return utils.toCap(type.name);
			})
			.join(', ');
		embed.addField(title, body, false);
	}

	// for (const [name, value] of Object.entries(breakpointsMap)) {
	// 	const { high, low } = calulateCombatPower(statsPKGO, value);
	// 	embed.addField(utils.toCap(name), `${low} to ${high}`, true);
	// }

	return { embed };
}

module.exports = {
	discord
};
