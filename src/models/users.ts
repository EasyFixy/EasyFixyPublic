export default class User {
    username: string;
    email: string;
    password: string;
  
    constructor(data:any) {
      this.username = data.username;
      this.email = data.email;
      this.password = data.password;
    }
  }