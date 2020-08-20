export class BaseRepository {
  model: any;
  repoName: string;
  constructor(model, repoName) {
    // Mongoose model object
    this.model = model;
    // Repository name
    this.repoName = repoName;
  }
  
  /**
   * Helper method to findOne in DB
   * @param {Object} [queryObj] - query obj
   * @param {Array} [populateFields] - Foreign fields to populate
   * @param {Array} [selectFields] - Fields to return in the query
   * @param {string} [reqId] - request id
   * @returns {Promise<unknown>}
   */
  findOne(queryObj: any = {}, populateFields: Array<string> = [], selectFields: Array<any> = [], reqId: string) {
    if (selectFields.length === 0) {
      selectFields.push('-__v', '-isDeleted')
    }
    return new Promise((resolve, reject) => {
      this.model.findOne(queryObj)
      .select(selectFields)
      .populate(populateFields)
      .then((data) => {
        if (data) {
        } else {
        }
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
