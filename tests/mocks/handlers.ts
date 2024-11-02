import { http, HttpResponse } from "msw";
import { API_ADDRESS } from "../../src/config";
import { mockCategories, mockColors } from "./mockData";

export const handlers = [
  http.get(`${API_ADDRESS}/categories/global`, () => {
    return HttpResponse.json(mockCategories);
  }),
  http.get(`${API_ADDRESS}/colors`, () => {
    return HttpResponse.json(mockColors);
  }),
  http.put(`${API_ADDRESS}/users/update`, () => {
    return HttpResponse.json({ token: "newToken" });
  }),
  http.delete(`${API_ADDRESS}/users`, () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
