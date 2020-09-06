import { Injectable } from '@nestjs/common';
import { LogService } from '../../logger/services';
import { WinstonHelper } from '../../logger/helpers';

@Injectable()
export class BaseRepository {
  model: any;
  repoName: string;
  winstonHelper: WinstonHelper = new WinstonHelper();
  logService: LogService = new LogService(this.winstonHelper);
  
  /**
   * Base repository constructor
   * @param {Object} [model] - Repository object
   * @param {String} [repoName] - Repository name
   */
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
   * @returns {Promise}
   */
  findOne(queryObj: any = {}, populateFields: Array<string> = [], selectFields: Array<any> = [], reqId: string): Promise<any> {
    this.logService.debug(reqId, `[${this.repoName} Repository]: findOne() method starts with query object: ${JSON.stringify(queryObj)}`);
    if (selectFields.length === 0) {
      selectFields.push('-__v', '-isDeleted')
    }
    return new Promise((resolve, reject) => {
      this.model.findOne(queryObj)
      .select(selectFields)
      .populate(populateFields)
      .then((data) => {
        if (data) {
          this.logService.info(reqId, `[${this.repoName} Repository]: Successfully found data with query object: ${JSON.stringify(queryObj)}`);
        } else {
          this.logService.info(reqId, `[${this.repoName} Repository]: Found no data with query object: ${JSON.stringify(queryObj)}`);
        }
        resolve(data);
      }).catch((error) => {
        this.logService.error(reqId, `[${this.repoName} Repository]: An error occurred finding data with query object: ${JSON.stringify(queryObj)}. Error: ${JSON.stringify(error)}`);
        reject(error);
      });
    });
  }
}
