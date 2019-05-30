import {
  HttpService,
  HttpResponse,
  successResponse,
  failureResponse
} from "./HttpService";

interface Dependencies {
  apiUrl: string;
}

export class FetchHttpService implements HttpService {
  private apiUrl: string;

  constructor({ apiUrl }: Dependencies) {
    this.apiUrl = apiUrl;
  }

  public post<T>(path: string, body: any): Promise<HttpResponse<T>> {
    const url = `${this.apiUrl}${path}`;

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then(async response => {
      if (response.ok) {
        return successResponse(response.status, await response.json());
      }

      return failureResponse(response.status, new Error("Network error"));
    });
  }
}
