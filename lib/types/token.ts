export default interface Token {
  id: number;
  name: string;
  token_type: string;
  issuer: string;
  encrypted_token: string;
  issued_at: string;
  expires_at: string;
  last_used_at: string | null;
  active: boolean;
  scopes: string | null;
  user_id: number;
  created_at: string;
  updated_at: string;
  encrypted_token_iv: string;
  token: string;
}
