module.exports = class WordDto {
    id;
    value;
		meaning;
		learned;

    constructor(model) {
        this.id = model.id;
        this.value = model.value;
				this.meaning = model.meaning;
				this.learned = model.learned;
    }
}