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
  // Filter
  filter() {
    const copyQueryStr = { ...this.querySrt };

    // Removing some fields for category
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete copyQueryStr[key]);

    // filter for Price and Rating
    let queryStr = JSON.stringify(copyQueryStr);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
}
module.exports = ApiFeatures;