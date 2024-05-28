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
