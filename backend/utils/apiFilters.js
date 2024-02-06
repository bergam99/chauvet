class APIFilters {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          // if there is a key, search name of the product
          name: {
            // not exactly match is ok
            $regex: this.queryString.keyword,
            $options: "i", // case insenstive
          },
        }
      : {}; // if keyword is not there, empty object

    this.query = this.query.find({ ...keyword });
    return this;
  }
}

export default APIFilters;
