import Model from './model';
import bcrypt from 'bcrypt';

export interface StoreUser {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
}

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = Number(process.env.SALT_ROUNDS)

export default class UserStore extends Model {
  index = async (): Promise<StoreUser[]> => await this.execute(
    'SELECT * FROM store_user',
    'rows'
  );

  show = async (id: string): Promise<StoreUser> => await this.execute(
    'SELECT * FROM store_user WHERE id=($1)',
    'rows',
    [id]
  );

  create = async (user: StoreUser): Promise<StoreUser> => {
    const password = bcrypt.hashSync(user.password + pepper, saltRounds);

    return await this.execute(
      'INSERT INTO store_user (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *',
      'rows.0',
      [user.firstName, user.lastName, password]
    );
  }

  delete = async (id: string): Promise<StoreUser> => await this.execute(
    'DELETE FROM store_user WHERE id=($1)',
    'rows',
    [id]
  );

  authenticate = async (user: StoreUser) => {
    const result: StoreUser = await this.execute(
      'SELECT * FROM store_user WHERE firstName=($1) AND lastName=($2)',
      'rows.0',
      [user.firstName, user.lastName]
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