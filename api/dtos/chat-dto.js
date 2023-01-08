module.exports = class ChatDto {
    id;
    chatId;
		intervalTime;
		timeoutTime;

    constructor(model) {
        this.id = model.id;
        this.chatId = model.chatId;
				this.intervalTime = model.intervalTime;
				this.timeoutTime = model.timeoutTime;
    }
}