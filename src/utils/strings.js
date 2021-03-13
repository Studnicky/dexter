function numSuffix(num) {
	//  Add suffixes to number
	var dec = num % 10,
		cent = num % 100;
	switch (true) {
		case dec == 1 && cent != 11:
			return num + 'st';
		case dec == 2 && cent != 12:
			return num + 'nd';
		case dec == 3 && cent != 13:
			return num + 'rd';
		default:
			return num + 'th';
	}
}

function toCap(string) {
	//	Captialize first letter of a string
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function toLow(string) {
	//	Lowercase first letter of a string unless it's "I "
	if (string.charAt(0) === 'I' && string.charAt(1) === ' ') {
		return string;
	}
	return string.charAt(0).toLowerCase() + string.slice(1);
}

module.exports = {
	numSuffix,
	toCap,
	toLow
};
