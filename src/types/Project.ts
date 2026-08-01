
interface Categories {
    name: string
}

export interface Technologies {
    name: string,
    popularity?: number
}

interface Authors {
    name: string,
    slug?: string,
    email?: string,
    github_url?: string,
    linkedin_url?: string,
    twitter_url?: string,
    avatar_url?: string,
    bio?: string
}

export interface IProject {
    id?: any,
    name: string,
    slug: string,
    description: string,
    short_description: string,
    logo_url: string,
    type: string,
    stage: string,
    needs: string,
    website_url: string,
    github_url: string,
    linkedin_url: string,
    twitter_url: string,
    email: string,
    city: string,
    address: string,
    latitude: string,
    longitude: string,
    founded_date: string,
    created_at: string,
    updated_at: string,
    view_count: number,
    likes_count: number,
    is_verified: boolean,
    is_archived?: boolean,
    is_deleted?: boolean,
    verified_at: string,
    is_featured: string,
    categories: Array<Categories> | string,
    technologies: Array<Technologies> | Array<string> | string,
    audiences: string | string[],
    authors: Array<Authors> | string,
}

export interface ProjectStats {
    startup: number,
    open_source: number,
    developper: number,
    news: number
}

export type ProjectCreate = Omit <IProject, 'slug' |
                                            'short_description' |
                                            'stage' |
                                            'city' |
                                            'latitude' |
                                            'longitude' |
                                            'created_at' |
                                            'updated_at' |
                                            'view_count' |
                                            'likes_count' |
                                            'is_verified' |
                                            'verified_at' |
                                            'is_featured' 
                                            >

export type ProjectUpdate = Partial<IProject>