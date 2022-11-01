import { Article } from '../../definitions.ts'
import { MongoStorage } from '../database/mongo-storage.ts'


const storage = new MongoStorage("Headless")
const collectionName = "Articles"
await storage.start()
storage.createCollection(collectionName)

export async function getArticle(id: number){
    return await storage.get(id, collectionName)
}

export async function getArticles(){
    return JSON.stringify(await storage.getAll(collectionName), null, 2)
}

export async function postArticle(article: Article){
    const isPosted = await storage.add(article, collectionName)
    
    return isPosted
}

export async function putArticle(article: Article){
    const isUpdated = await storage.update(article, collectionName)

    return isUpdated
}

export async function deleteArticle(id: number){
    const isDeleted = await storage.delete(id, collectionName)

    return isDeleted
}