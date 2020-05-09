const advancedResults = (model, populate) => async (req, res, next) => {
  let reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'limit', 'page'];

  // Remove fields from query
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in|ne)\b/g,
    (match) => `$${match}`,
  );

  // Default options
  const options = {
    select: '',
    sort: '-createdAt',
    limit: 10,
    page: 1,
    lean: false,
    populate: populate,
  };

  // Select fields
  if (req.query.select) {
    options.select = req.query.select.split(',').join(' ');
  }

  // Sort
  if (req.query.sort) {
    options.sort = req.query.sort.split(',').join(' ');
  }

  // Limit
  if (req.query.limit) {
    options.limit = req.query.limit;
  }

  // Page
  if (req.query.page) {
    options.page = req.query.page;
  }

  const results = await model.paginate(JSON.parse(queryStr), options);

  res.advancedResults = {
    success: true,
    status: 200,
    count: results.length,
    data: results.docs,
    count: results.docs.length,
    limit: results.limit,
    page: results.page,
    nextPage: results.nextPage,
    prevPage: results.prevPage,
  };

  next();
};

module.exports = advancedResults;
