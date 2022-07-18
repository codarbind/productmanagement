let Product = require('../models/product.model')

module.exports = {
    async create(data) {
      let prd = await Product.create (data);
      return prd;
    },
    async findByOwnerId(ownerId, filter){
      const prd = await Product.findOne({ownerId, ...filter})
      return prd
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
      const product = await Product.find(searchObject);
      console.log({product})
      return product;
    }

  };
  