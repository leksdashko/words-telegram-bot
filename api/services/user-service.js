const UserModel = require('../models/user-model');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
    async registration(username) {
        const candidate = await UserModel.findOne({where: {username}});
        if(candidate){
					const userDto = new UserDto(candidate);

					return {
							user: userDto
					}
        }
        
        const user = await UserModel.create({username});
        const userDto = new UserDto(user);

        return {
            user: userDto
        }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({where: {activationLink}});
        if(!user){
            throw ApiError.BadRequest('Activation link is not correct');
        }
        user.isActivated = true;
        await user.save();
    }
    
    async getAllUsers() {
        const users = await UserModel.findAll();
        return users;
    }
}

module.exports = new UserService();