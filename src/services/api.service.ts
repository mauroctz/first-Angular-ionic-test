import { ApiData, User } from "../interfaces/Api";
import { Injectable } from "@angular/core";
import * as localForage from "localforage";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ApiService {
  private BASE_PATH = "https://reqres.in/api/users?page=";

  constructor(private http: HttpClient) {}

  async getUsersByPage(page: number): Promise<ApiData> {
    localForage.keys(function (err, keys) {
      console.log(keys);
    });
    try {
      let forageItem = this.getForageItem(`u-p-${page}`);
      if (!forageItem) {
        let res = await this.http.get(`${this.BASE_PATH}${page}`).toPromise();
        localForage.setItem(`u-p-${page}`, res);
      }
      return forageItem;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getForageItem(item: string): Promise<ApiData> {
    try {
      let response = (await localForage.getItem(item)) as any;
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  updateItemForage(data: ApiData, page: number): void {
    localForage.setItem(`u-p-${page}`, data);
  }
}
