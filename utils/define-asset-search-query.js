const defineSearchQuery = (req) => {
  return req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { description: { $regex: req.query.search, $options: 'i' } },
          { _id: { $regex: req.query.search } },
        ],
      }
    : {};
};

module.exports = defineSearchQuery;
