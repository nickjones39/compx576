var mongoose = require('mongoose');

const defineSearchQuery = (req) => {
  
  /*
  try {
    var id = mongoose.Types.ObjectId(req.query.search);

    return req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          //{ description: { $regex: req.query.search, $options: 'i' } },
          { userId: { $eq: id } },
        ],
      }
    : {};

  }
  catch {

  }
*/
  return req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { description: { $regex: req.query.search, $options: 'i' } },
          { userId: { $regex: req.query.search, $options: 'i'  } },
        ],
      }
    : {};
};

module.exports = defineSearchQuery;
