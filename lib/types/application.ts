export type Application = {
  job_id: number;
  user_id: number;
  application_text: string;
  application_documents: any;
  response: any;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  first_name: string;
  last_name: string;
  applicant: Applicant
};

export type Applicant = {
  id: number;
  first_name: string;
  last_name: string;
  activity_status: number; // Assuming 1 is active, other values for different statuses
  user_role: "admin" | "user" | "editor" | "viewer"; // Define possible roles
  date_of_birth: string | null; // Nullable ISO date string
  linkedin_url: string | null; // Nullable URL
  instagram_url: string | null; // Nullable URL
  twitter_url: string | null; // Nullable URL
  facebook_url: string | null; // Nullable URL
  github_url: string | null; // Nullable URL
  portfolio_url: string | null; // Nullable URL
  image_url: string; // Presumably required
  created_at: string; // ISO date string
};

export type ApplicationAttachment = {
  attachment: {
    id: number;
    user_id: number;
    job_id: number;
    created_at: string;
    updated_at: string;
  };
  url: string;
};

export type ApplicationAnswer = {
  id: number;
  job_id: number;
  user_id: number;
  application_option_id: number;
  answer: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
