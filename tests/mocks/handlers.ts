import { http, HttpResponse } from "msw";
import { API_ADDRESS } from "../../src/config";
import {
  mockCategories,
  mockColors,
  mockGetCategoryResponse,
  mockSession,
  mockSessionCategories,
} from "./mockData";

export const handlers = [
  http.get(`${API_ADDRESS}/categories/global`, () => {
    return HttpResponse.json(mockCategories);
  }),
  http.get(`${API_ADDRESS}/colors`, () => {
    return HttpResponse.json(mockColors);
  }),
  http.get(`${API_ADDRESS}/sessions/${mockSession.id}`, () => {
    return HttpResponse.json(mockSession);
  }),
  http.get(`${API_ADDRESS}/categories/list/${mockSession.id}`, () => {
    return HttpResponse.json(mockSessionCategories);
  }),
  http.put(`${API_ADDRESS}/sessions/update/${mockSession.id}`, () => {
    return HttpResponse.json(mockSession);
  }),
  http.delete(`${API_ADDRESS}/sessions/${mockSession.id}`, () => {
    return new HttpResponse(null, { status: 204 });
  }),
  http.put(`${API_ADDRESS}/users/update`, () => {
    return HttpResponse.json({ token: "newToken" });
  }),
  http.delete(`${API_ADDRESS}/users`, () => {
    return new HttpResponse(null, { status: 204 });
  }),
  http.put(
    `${API_ADDRESS}/categories/update/${mockGetCategoryResponse.category.id}`,
    () => {
      return new HttpResponse(null, { status: 204 });
    },
  ),
];
