export enum UserType {
  INNER = "inner",
  STAFF = "staff",
  ADMIN = "administrator",
  GUEST = "guest",
}

export interface User {
  userId: string;
  username: string;
  email: string;
  type: UserType;
  views: number;
}

export class UserService {
  private static instance: UserService;
  private user: User | undefined = undefined;
  private failedAttempts = 0;

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }

  private constructor() {
    const userStorage =
      localStorage.getItem("user") ?? sessionStorage.getItem("user");
    if (userStorage) this.user = JSON.parse(userStorage);
  }

  setUser(user: User, rememberMe = false) {
    this.logout();

    this.user = user;
    if (rememberMe) {
      localStorage.setItem("user", JSON.stringify(this.user));
    } else {
      sessionStorage.setItem("user", JSON.stringify(this.user));
    }
  }

  getUser() {
    return this.user;
  }

  get type() {
    return this.user?.type ?? UserType.GUEST;
  }

  isLoggedIn() {
    return this.type !== UserType.GUEST;
  }

  logout() {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    localStorage.removeItem("loginTimer");
    this.failedAttempts = 0;
    this.user = undefined;
  }

  getFailedAttempts() {
    return this.failedAttempts;
  }

  failedLogin() {
    this.failedAttempts++;
    if (this.failedAttempts === 3) {
      localStorage.setItem("loginTimer", Date.now().toString());
    }
  }

  get timer() {
    return parseInt(localStorage.getItem("loginTimer") ?? "0");
  }

  canLogin() {
    const obj = {
      canLogin: true,
      failedAttempts: this.failedAttempts,
      howLongToWaitInMinutes: (this.timer + 3600000 - Date.now()) / 1000 / 60,
    };
    if (Date.now() >= this.timer + 3600000) {
      this.failedAttempts = 0;
      localStorage.removeItem("loginTimer");
      return obj;
    }

    obj.canLogin = false;
    return obj;
  }
}
