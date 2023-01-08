const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');

class TokenService {
    ACCESS_TOKEN_DURATION = '30m';
    REFRESH_TOKEN_DURATION = '30d';
    REFRESH_TOKEN_MAX_AGE = 30*24*60*60*1000;

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn:this.ACCESS_TOKEN_DURATION});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn:this.REFRESH_TOKEN_DURATION});

        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try{
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        }catch(e){
            return null;
        }
    }

    validateRefreshToken(token) {
        try{
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        }catch(e){
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({where: {userId}})
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await tokenModel.create({userId, refreshToken});
        return token;
    }

    async removeToken(refreshToken) {
        return await tokenModel.destroy({where: {refreshToken}});
    }

    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({where: {refreshToken}});
        return tokenData;
    }
}

module.exports = new TokenService();