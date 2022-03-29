import client from '../database';
import get from 'lodash/get';

export default class Model {
  execute = async (sql: string, path?: string, params?: Array<string | number>): Promise<any> => {
    try {
      const conn = await client.connect();
      const result = await conn.query(sql, params ? params.map(param => String(param)) : undefined);
      conn.release();

      if (path) {
        return get(result, path);
      }
    } catch (e) {
      console.log(sql);
      console.log(e);
      throw Error(`Unable to execute sql ${sql}`);
    }
  };
}