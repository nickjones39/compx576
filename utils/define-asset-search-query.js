
const defineSearchQuery = (req) => {

  return req.query.search
    ? {
        $or: [
          { "name": { $regex: req.query.search, $options: 'i' } },
          { "description": { $regex: req.query.search, $options: 'i' } },
          { "assignedTo._id": { $regex: ObjectId(req.query.search), $options: 'i'  } },
        ],
      }
    : {};
};

module.exports = defineSearchQuery;
