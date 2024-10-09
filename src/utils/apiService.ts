import { API_ADDRESS } from "../config";
import { ErrorCode, SuccessCode } from "../types/StatusCode";

type JSONValue = string | number | boolean | None | JSONObject | JSONArray;
export type JSONObject = { [key: string]: JSONValue };
export type JSONArray = Array<JSONValue>;
type None = null | undefined;
type Data = JSONObject | JSONArray | FormData;

type CustomResponse = Response & { status: SuccessCode | ErrorCode };
type ErrorResponseData = { message: string };

export async function callAPI<T extends Data | void = void>(
  url: string,
  method: "POST" | "GET" | "DELETE" | "PUT" | "PATCH",
  body?: Data,
): Promise<T> {
  const token = localStorage.getItem("token");

  console.log(API_ADDRESS);

  const headers =
    body instanceof FormData
      ? new Headers()
      : new Headers({ "Content-Type": "application/json" });

  if (token !== null) {
    headers.append("Authorization", "Bearer " + token);
  }

  const options: RequestInit = {
    method,
    headers,
    ...(method !== "GET" && {
      body: body instanceof FormData ? body : JSON.stringify(body ?? {}),
    }),
  };

  const response: CustomResponse = await fetch(API_ADDRESS + url, options);

  if (response.status === SuccessCode.NO_CONTENT) return undefined as T;

  const data: T | ErrorResponseData = await response.json();

  if (response.status === SuccessCode.OK) {
    const validData = data;
    return validData as T;
  }

  const error = data as ErrorResponseData;

  switch (response.status) {
    case ErrorCode.UNAUTHORIZED: {
      localStorage.removeItem("token");
      window.location.href = "/signup";
      break;
    }

    case ErrorCode.FORBIDDEN: {
      window.location.href = "/";
      break;
    }
  }

  throw new ControlledError(response.status, error.message);
}

export class ControlledError extends Error {
  status: ErrorCode;

  constructor(
    status: ErrorCode = ErrorCode.SERVER_ERROR,
    message: string = "Something went wrong.",
  ) {
    super(message);
    this.status = status;
  }
}
