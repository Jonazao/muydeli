export default class PageResult {
  constructor(total = 0, limit = 10, page = 1) {
    this.total = parseInt(total, 10);
    this.limit = parseInt(limit, 10); // page size
    this.page = parseInt(page, 10) < 0 ? 1 : parseInt(page, 10);
    this.skip = (this.page - 1) * limit; //  how many rows the database should “jump over”
    this.urls = null;
  }

  setUrls(filters) {
    const { pageNumber, pageSize, ...paramFilters } = filters;
    let lastPage = Math.ceil(this.total / this.limit);
    lastPage = lastPage === 0 ? 1 : lastPage;
    const firstPage = 1;
    const previousPage = this.page > firstPage ? this.page - 1 : null;
    const nextPage = this.page < lastPage ? this.page + 1 : null;
    const queryParameters = [];
    Object.keys(paramFilters).forEach((key) => {
      if (paramFilters[key]) {
        queryParameters.push(`${key}=${paramFilters[key]}`);
      }
    });
    const queryString = queryParameters.join('&');
    const setQueryString = queryParameters.length > 0 ? `&${queryString}` : '';
    this.urls = {
      first: lastPage !== firstPage ? `?pageSize=${this.limit}&pageNumber=${firstPage}${setQueryString}` : null,
      previous: previousPage ? `?pageSize=${this.limit}&pageNumber=${previousPage}${setQueryString}` : null,
      next: nextPage ? `?pageSize=${this.limit}&pageNumber=${nextPage}${setQueryString}` : null,
      last: lastPage !== firstPage ? `?pageSize=${this.limit}&pageNumber=${lastPage}${setQueryString}` : null,
      current: `?pageSize=${this.limit}&pageNumber=${this.page}${setQueryString}`,
    };
  }
}
