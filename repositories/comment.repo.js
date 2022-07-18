let Product = require('../models/comment.model')

module.exports = {
    async create(data) {
      let comm = await Product.create (data);
      return comm;
    },
    async findByProductId(productId, filter){
      const comm = await Product.findOne({productId, ...filter})
      return comm
    },
    async search(filter) {
      if(!filter) return false
      let searchArray = []
      for (let index = 0; index < filter.length; index++) {
        const element = filter[index];
        let regex = new RegExp(element, 'i') //regex constructor
        searchArray.push({ address: regex })
        
      }
      let searchObject = { $or: searchArray}// 
      const comment = await Product.find(searchObject);
      console.log({comment})
      return comment;
    }

}