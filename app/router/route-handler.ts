import { RouterContext, isHttpError } from "https://deno.land/x/oak/mod.ts";
import { Article } from "../../definitions.ts";
import { getArticle, getArticles, postArticle, putArticle, deleteArticle } from './actions.ts'

const isValidArticle = (article: Record<string, string>) =>{
    if(article === undefined) return false
    else if(article.id === undefined) return false
    else if(article.title === undefined || typeof article.title !== 'string') return false
    else if(article.body === undefined || typeof article.body !== 'string') return false
    else if(typeof article.id !== 'string' && typeof article.id !== 'number') return false
    return true
}

const getArticlesHandler = async (ctx: RouterContext<"/articles">) =>{
    try{
        const allArticles = await getArticles()
        ctx.response.body = allArticles

    }catch(e){
        ctx.response.body = { error:e.message }
    }
}

const getOneArticleHandler = async (ctx: RouterContext<"/articles/:id">) =>{
    try{
        const id = ctx.params.id
        const article = await getArticle(parseInt(id))
        if(article === undefined) ctx.response.body = {}
        else ctx.response.body = article
    }catch(e){
        ctx.response.body = { error:e.message }
    }
}

const postArticleHandler = async (ctx: RouterContext<"/articles">) =>{
    try{
        //Add JSON schema validation to check format
        const { value } = ctx.request.body({ type: 'json' });
        const article = await value
        
        if(!isValidArticle(article)) throw Error("Need to provide valid article object")

        const isPosted = await postArticle(article)

        ctx.response.body = { success:isPosted, article:article }
    }catch(e){
        throw Error(e.message)
    }
}

const updateArticleHandler = async (ctx: RouterContext<"/articles/:id">) =>{
    try{
        
        const { value } = ctx.request.body({ type: 'json' });
        const article: Article = await value

        const isUpdated = await putArticle(article)

        ctx.response.body = { success:isUpdated, article:article }
    }catch(e){
        ctx.response.body = { error:e.message }
    }
}

const deleteArticleHandler = async (ctx: RouterContext<"/articles/:id">) =>{
    try{
        const id = parseInt(ctx.params.id)
        const isDeleted = await deleteArticle(id)
        
        ctx.response.body = { success:isDeleted, id:id }
    }catch(e){
        ctx.response.body = { error:e.message }
    }
}

export { 
    getArticlesHandler, 
    getOneArticleHandler, 
    postArticleHandler, 
    updateArticleHandler, 
    deleteArticleHandler }