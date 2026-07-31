// Shape of a user object, exactly as returned by UserResource on the backend.
export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

// Payload sent to POST /api/register.
// The password_confirmation field is required by Laravel's "confirmed" validation rule.
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// Payload sent to POST /api/login.
export interface LoginPayload {
  email: string;
  password: string;
}

// Shape of the response returned by both /api/register and /api/login.
export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}
