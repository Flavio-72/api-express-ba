export default class User {
  constructor({ id, email, password, username, role = 'user' }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
    this.role = role;
  }

  toJSON() {
    const { password, ...userData } = this;
    return userData;
  }
}