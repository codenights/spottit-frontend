interface BaseResponse {
  statusCode: number;
}

interface SuccessResponse<T> extends BaseResponse {
  isSuccess: true;
  data: T;
}

interface FailureResponse extends BaseResponse {
  isSuccess: false;
  error: Error;
}

export type HttpResponse<T> = SuccessResponse<T> | FailureResponse;

export interface HttpService {
  post<T>(path: string, body: any): Promise<HttpResponse<T>>;
}

export function successResponse<T>(
  statusCode: number,
  data: T
): SuccessResponse<T> {
  return {
    isSuccess: true,
    data,
    statusCode
  };
}

export function failureResponse(
  statusCode: number,
  error: Error
): FailureResponse {
  return {
    isSuccess: false,
    error,
    statusCode
  };
}
