let User = require('../models/user.model')

module.exports = {
    async create(data) {
      let user = await User.create (data);
      return user;
    },
    async findByEmail(email, filter){
      const usr = await User.findOne({email, ...filter})
      return usr
    },
    async findById(id, filter) {
      const usr = await User.findOne({ _id:id, ...filter});
      return usr;
    }
  };
  