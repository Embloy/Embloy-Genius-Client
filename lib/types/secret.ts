export type Secret = {
    id: number;
    name: string;
    token_type: TokenType;
    issuer: TokenIssuer;
    issued_at: string;
    expires_at: string;
    last_used_at: string | null;
    active: boolean;
    scopes: any[];
    token: string;
  };
  
  type TokenType = {
    allowed: "api_key" | "refresh_token" | "access_token" | "client_token" | "request_token" ;
  };
  type TokenIssuer = {
    allowed: "ashby" | "embloy" | "lever";
  };
  