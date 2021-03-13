const sortOrderMap = {
	ASC: 1,
	DESC: -1
};

function sortObjectListByField(list, fieldName, sortOrder = 'ASC') {
	const sort = sortOrderMap[sortOrder];
	return list.sort((a, b) => {
		return a[fieldName] > b[fieldName] ? sort : sort * -1;
	});
}
function splitObjectListByField(list, fieldName) {
	return list.reduce((splitList, listItem) => {
		const fieldNameValue = listItem.hasOwnProperty(fieldName) ? listItem[fieldName] : null;
		splitList[fieldNameValue] = splitList.hasOwnProperty(fieldNameValue) ? splitList[fieldNameValue] : [];
		splitList[fieldNameValue].push(listItem);
		return splitList;
	}, {});
}

module.exports = {
	sortObjectListByField,
	splitObjectListByField
};
