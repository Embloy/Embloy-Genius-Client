type Description = {
    id: number
    name: string
    bode: string
    record_type: string
    record_id: number
}

type Format = {
    allowed: ".pdf" | ".docx" | ".txt" | ".xml"
}
type ApplicationOptions = {
    options: any[];
}

export type Job = {
    job_id: number
    job_type: string
    job_type_value: number
    job_slug: string
    job_value:string
    job_status: number // 0 or 1 <=> inactive or active
    status: string //public or private
    user_id: number
    duration: number
    code_lang: string
    title: string
    position: string
    image_url:string
    description: Description
    key_skills: string
    salary: number
    euro_salary: number
    currency: string
    start_slot: string
    latitude: number
    longitude: number
    country_code: string
    postal_code: string
    city: string
    address: string
    created_at: string
    updated_at: string
    relevance_score: number
    view_count: number
    application_count: number
    employer_rating: number
    job_notifications: number // 0 or 1 <=> inactive or active
    boost: number
    cv_required: boolean
    allowed_cv_format:Format
    refferer_url: string
    deleted_at: string
    application_options:ApplicationOptions


}