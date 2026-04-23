
import type { ActionFunctionArgs } from 'react-router-dom';
import { AxiosError } from 'axios'
import type { ProjectCreate } from '../types/Project';
import { apiClient } from './csrf.service';
import { SubmissionError } from '../errors/submission.error';

/**
 * Fonction utilitaire pour nettoyer un objet en supprimant les valeurs vides
 * Supprime les champs qui sont null, undefined, ou des chaînes vides
 */
function cleanPayload<T extends Record<string, any>>(obj: T): Partial<T> {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
            (acc as any)[key] = value;
        }
        return acc;
    }, {} as Partial<T>);
}

async function projectSubmissionAction( {request}: ActionFunctionArgs ) {
    try {
        const formData =  await request.formData()
        const name = formData.get('name') as string
        const logo = (formData.get('logo') ? formData.get('logo') : '') as string
        const type = formData.get('type') as string
        const description = formData.get('description') as string
        const author = formData.get('author') as string
        const categorie = formData.get('categories') as string
        const publics = formData.get('public') as string
        const needs = formData.get('needs') as string
        const email = formData.get('email') as string
        const website = formData.get('website') as string
        const github = formData.get('github') as string
        const twitter = formData.get('twitter') as string
        const linkedin = formData.get('linkedin') as string
        const address = (formData.get('address') ? formData.get('address') : '') as string
        const foundedValue = formData.get('foundedAt') as string
        const founded_date = foundedValue ? foundedValue.replace('/', '-') : ''
        const founded = founded_date.replace('/', '-')

        const techno = formData.get('technologies') as string
        const techno_comma = techno.includes(',')
        const techno_comma_space = techno.includes(', ')
        let technologies :Array<string> = []

        if (techno_comma) {
            technologies = techno.trim().split(',')
        } else if (techno_comma_space) {
            technologies = techno.trim().split(', ')
        }

        const url = import.meta.env.VITE_API_PROJECT as string

        const payload: ProjectCreate = {
            name : name,
            logo_url: logo,
            type: type,
            description: description,
            authors: author,
            audiences: publics,
            categories: categorie,
            technologies: technologies,
            needs : needs,
            email : email,    
            website_url : website,
            github_url : github,
            twitter_url : twitter,
            linkedin_url: linkedin,
            address : address,
            founded_date : founded,
        }
        if (!payload.name || !payload.description || !payload.categories || !payload.needs || !payload.technologies || !payload.founded_date){
            console.log('Payload envoyé :', payload)
            throw new SubmissionError(500, 'Fields with * are required !')
        }
        //console.log('Payload envoyé :', payload)
        await apiClient.post(url, payload)
        //console.log('Axios response :', response)
        return { success: true }
        
    } catch (error) {
        //console.log("Erreur lors de la création de projet : ", error)
        if (error instanceof AxiosError) {
            //console.log('Error :', error)
            //console.log('Error message :', error.response?.data.name[0])
            return { error: error.response?.data.name[0]}
        } else if (error instanceof SubmissionError) {
            console.error(error);
            return { error: error.message }
        }
    }
}


async function projectUpdateAction( {request}: ActionFunctionArgs ) {
    try {
        const formData =  await request.formData()
        const projectId = Number(formData.get('ident'))
        const name = formData.get('name') as string
        const logo = formData.get('logo') as string
        const type = formData.get('type') as string
        const description = formData.get('description') as string
        const author = formData.get('author') as string
        const categorie = formData.get('categorie') as string
        const publics = formData.get('public') as string
        const needs = formData.get('needs') as string
        const email = formData.get('email') as string
        const website = formData.get('website') as string
        const github = formData.get('github') as string
        const twitter = formData.get('twitter') as string
        const linkedin = formData.get('linkedin') as string
        const address = formData.get('address') as string
        const foundedValue = formData.get('foundedAt') as string
        const founded_date = foundedValue ? foundedValue.replace('/', '-') : ''
        const founded = founded_date.replace('/', '-')

        const techno = formData.get('technologies') as string
        const technologies = techno.trim().split(', ')

        const url = import.meta.env.VITE_API_PROJECT as string
        const updateUrl = url + `${projectId}/`

        const payload: ProjectCreate = {
            id: projectId,
            name : name,
            logo_url: logo,
            type: type,
            description: description,
            authors: author,
            audiences: publics,
            categories: categorie,
            technologies: technologies,
            needs : needs,
            email : email,    
            website_url : website,
            github_url : github,
            twitter_url : twitter,
            linkedin_url: linkedin,
            address : address,
            founded_date : founded,
        }
        const cleanedUpdate = cleanPayload(payload)
        await apiClient.patch(updateUrl, cleanedUpdate)
        return { success: true }
        
    } catch (error) {
        console.log("Erreur lors de la création de projet : ", error)
        if (error instanceof AxiosError) {
            console.log('Error :', error)
            console.log('Error message :', error.response?.data.name[0])
            return { error: error.response?.data.name[0]}
        } else {
            console.error(error);
            console.log("Error 500 : Internal Error Server.");
        }
    }
}

export async function dashboardAction(args: ActionFunctionArgs) {
    const clonedRequest = args.request.clone();
    const formData = await clonedRequest.formData();
    const intent = formData.get("intent");

    if(intent === 'project-submission') {
        return await projectSubmissionAction(args)
    }

    if(intent === 'project-update') {
        return await projectUpdateAction(args)
    }

}