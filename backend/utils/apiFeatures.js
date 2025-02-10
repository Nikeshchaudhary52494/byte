class ApiFeatures {
  constructor(query, querySrt) {
    this.query = query;
    this.querySrt = querySrt;
  }

  // Search
  search() {
    const keyword = this.querySrt.keyword
      ? {
        $or: [
          {
            name: {
              $regex: this.querySrt.keyword,
              $options: "i",
            },
          },
          {
            category: {
              $regex: this.querySrt.keyword,
              $options: "i",
            },
          },
        ],
      }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  condition() {
    const condition = this.querySrt.condition
      ? { itemCondition: this.querySrt.condition }
      : {};
    this.query = this.query.find({ ...condition });
    return this;
  }

  // General Filters
  filter() {
    const copyQueryStr = { ...this.querySrt };

    // Removing fields not needed for filtering
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete copyQueryStr[key]);

    // Formatting MongoDB comparison operators
    let queryStr = JSON.stringify(copyQueryStr);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // Pagination
  paginate() {
    const page = parseInt(this.querySrt.page, 10) || 1;
    const limit = parseInt(this.querySrt.limit, 10) || 8;

    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = ApiFeatures;
