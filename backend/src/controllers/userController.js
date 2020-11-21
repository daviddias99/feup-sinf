const bcrypt = require('bcrypt');

exports.all_users = async (req, res) => {
  try {
    const users = await req.app.db('users').select(['id', 'username']);
    res.send(users);
  } catch (err) {
    console.log('DataBase Error...');
    console.log(err);
  }
};

exports.new_user = async (req, res) => {
  try {
    if (!req.body.username) {
      res.status(400).json('Expected to have the Username Argument for Creating an User!').send();
      return;
    }

    if (!req.body.password) {
      res.status(400).json('Expected to have the Password Argument for Creating an User!').send();
      return;
    }

    const user = await req.app.db('users').insert([{ username: req.body.username }, { password: bcrypt.hashSync('req.body.password', 10) }], ['id', 'username']);
    res.status(201).send(user);
  } catch (err) {
    console.log('DataBase Error...');
    console.log(err);
  }
};

exports.user_by_id = async (req, res) => {
  try {
    const user = await req.app.db('users').where({ id: req.params.id }).first(['id', 'username']);

    if (!user) {
      res.status(404).json(`User with ID ${req.params.id} not found!`).send();
      return;
    }
    res.send(user);
  } catch (err) {
    console.log('DataBase Error...');
    console.log(err);
  }
};

exports.user_company = async (req, res) => {
  try {
    const user = await req.app.db('users').where({ id: req.params.id }).first();

    if (!user) {
      res.status(404).json(`User with ID ${req.params.id} not found!`).send();
      return;
    }

    const company = await req.app.db('companies').where({ id: user.company_id }).first(['id', 'company_key', 'app_id', 'tenant', 'organization']);

    res.send(company);
  } catch (err) {
    console.log('DataBase Error...');
    console.log(err);
  }
};
