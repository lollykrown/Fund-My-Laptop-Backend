const Request = require("./../models/Request");
const CustomError = require("./../utils/CustomError");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

class RequestService {
  async create(data) {
    const request = new Request(data);
    const token = await jwt.sign({ id: request._id }, jwtSecret, { expiresIn: 36000 });
    await request.save();

    return {
      // token: token,
      uid: request._id,
      name: request.name,
      email: request.email,
      fundStatus: request.isFunded
    };
  }

  async update(data) {
    return data;
  }

  async delete(requestId) {
    return Request.findByIdAndRemove(requestId);
  }

  async findById(requestId) {
    return Request.findById(requestId);
  }

  async find(period1, period2) {
    return Request.find({$and: [{isFunded: true}, {date: {$gte: period1, $lte: period2}}]});
  }
}

module.exports = new RequestService();
