export interface CreatePlasgateOption {
  secret?: string;
  private_key?: string;
  sender?: string;
  to?: string;
  content?: string;
}

// Send multi SMS
export interface CreatePlasgateOptions {
  secret?: string;
  private_key?: string;
  sender?: string;
  to?: string[];
  content?: string;
  dlr?: string;
}
