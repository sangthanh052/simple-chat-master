import { Db } from 'mongodb';

module.exports = {
  async up(db: Db) {
    db.collection('users').createIndex({ email: 1 }, { unique: true });
  },
};
