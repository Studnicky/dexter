const Discord = require('discord.js');
const config = require('../../../../config');
const utils = require('../utils');

const { splitObjectListByField, sortObjectListByField } = require('../utils');

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
function discord(pokemon, types) {
	const typeRelationsList = types.map(convertToPKGORelations).flat();
	const { offense } = splitObjectListByField(typeRelationsList, 'category');

	const offenseObject = splitObjectListByField(offense, 'source');

	const typesObject = {
		primary: pokemon.types.find((type) => {
			return type.slot === 1;
		})['type']['name'],
		title: `Type${pokemon.types.length > 1 ? 's' : ''}:`,
		body: pokemon.types
			.map((type) => {
				return utils.toCap(type.type.name);
			})
			.join(', ')
	};

	const embed = new Discord.MessageEmbed()
		.setTitle(`${utils.toCap(pokemon.name)} Offensive Type Chart:`)
		.setThumbnail(pokemon.sprites.front_default)
		.setColor(config.theme.typeToColor[typesObject.primary]['color'])
		.setFooter(`Provided by Pokeapi`, 'https://pokeapi.co/')
		.setTimestamp();

	embed.addField(typesObject.title, typesObject.body, true);

	for (const [name, types] of Object.entries(offenseObject)) {
		const splitLists = splitObjectListByField(types, 'relation');

		for (const [effectiveness, typeList] of Object.entries(splitLists)) {
			const title = `${utils.toCap(name)} offense ${effectiveness} against:`;

			const body = typeList
				.map((type) => {
					return utils.toCap(type.name);
				})
				.join(', ');

			embed.addField(title, body, false);
		}
	}

	return { embed };
}

module.exports = {
	discord
};
