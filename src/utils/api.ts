
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
export function getApiBaseUrl(): string {
  return import.meta.env.VITE_API_URL || "/api";
}

export async function handleApiResponse<T>(
  response: Response
): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: `HTTP error! status: ${response.status}`,
    }));
    return {
      success: false,
      message: error.message || "Request failed",
    };
  }

  const data = await response.json();
  return {
    success: true,
    data,
  };
}
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${getApiBaseUrl()}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    return handleApiResponse<T>(response);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return {
        success: false,
        message: "API endpoint not available",
      };
    }
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

