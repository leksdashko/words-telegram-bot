function createArrayOfNumbers(length) {
	return [...Array(length).keys()];
}

function shuffleArray(array) {
	if(!array) return array;

	for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

	return array;
}

module.exports = {
	createArrayOfNumbers,
	shuffleArray
}