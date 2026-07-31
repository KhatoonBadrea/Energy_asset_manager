import api from "../api";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "../../types/auth.types";

/**
 * Send a registration request to the backend.
 * On success, the backend already returns a token, so the caller
 * (AuthContext, built in the next step) can log the user in immediately.
 */
export async function register(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/register", payload);
  return response.data;
}

/**
 * Send a login request to the backend with email and password.
 */
export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/login", payload);
  return response.data;
}

/**
 * Revoke the current token on the backend.
 * The actual removal of the token from localStorage happens in AuthContext,
 * this function only talks to the API.
 */
export async function logout(): Promise<void> {
  await api.post("/logout");
}
