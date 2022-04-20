import { decodeJwt } from "jose";
import { ValidationError } from "yup";

import { User } from "../model/user";

const TOKEN_NAME = 'authToken';
const API_URL = '/api/users';

class AuthServiceImplentation {
  
  private storage: Storage;

  constructor() {
    this.storage = window.sessionStorage;
  }

  public async login(username: string, password: string) {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    if (response.status !== 200) {
      throw new ValidationError("Invalid username or password");
    }

    const { authToken } = await response.json();
    this.authToken = authToken;
  }

  public get authToken(): string | null {
    return this.storage.getItem(TOKEN_NAME) ?? null;
  }

  public set authToken(token: string) {
    if (token) {
      this.storage.setItem(TOKEN_NAME, token);
    } else if (this.authToken) {
      this.storage.removeItem(TOKEN_NAME);
    }
  }

  public async getProfile(verify = false): Promise<User> {
    const token = this.authToken;
    if (token) {
      if (verify) {
        return this.requestProfile();
      }
      return decodeJwt(token) as unknown as User;
    }
    return null;
  }

  private async requestProfile() {
    const authToken = this.authToken;
    const authorization = authToken && `Bearer ${authToken}`;
    const response = await fetch(`${API_URL}/profile`, {
      method: "GET",
      headers: {
        authorization,
        "Content-Type": "application/json",
        "accept": "application/json"
      },
    });
    const result = await response.json();
    if (response.status === 200) {
      return result as User;
    }

    this.authToken = null;
    return Promise.reject({
      status: response.status,
      error: result,
    });
  }

}

export const AuthService = new AuthServiceImplentation();

