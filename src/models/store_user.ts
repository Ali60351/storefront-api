import Model from './model';
import bcrypt from 'bcrypt';
import { StoreUser } from '../types';

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = Number(process.env.SALT_ROUNDS)

export default class UserStore extends Model {
  index = async (): Promise<StoreUser[]> => await this.execute(
    'SELECT * FROM store_user',
    'rows'
  );

  show = async (id: string): Promise<StoreUser> => await this.execute(
    'SELECT * FROM store_user WHERE id=($1)',
    'rows.0',
    [id]
  );

  create = async (user: StoreUser): Promise<StoreUser> => {
    const password = bcrypt.hashSync(user.password + pepper, saltRounds);

    return await this.execute(
      'INSERT INTO store_user (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *',
      'rows.0',
      [user.first_name, user.last_name, password]
    );
  }

  delete = async (id: string): Promise<StoreUser> => await this.execute(
    'DELETE FROM store_user WHERE id=($1) RETURNING *',
    'rows.0',
    [id]
  );

  authenticate = async (user: StoreUser) => {
    const result: StoreUser = await this.execute(
      'SELECT * FROM store_user WHERE first_name=($1) AND last_name=($2)',
      'rows.0',
      [user.first_name, user.last_name]
    );

    if (!result) {
      return 'User does not exist!';
    };

    if (bcrypt.compareSync(String(user.password + pepper), result.password)) {
      return result;
    } else {
      return 'Incorrect password!';
    };
  }
}