import { Article } from '../../definitions.ts'

export interface ArticlesMemory{
    articles: Array<Article>
}

export class ArticlesMemory{
    constructor(){
        this.articles = []
    }

    get(id: number){
        return this.articles[id]
    }

    getAll(){
        return this.articles
    }

    add(article: Article){
        this.articles.push(article)
        const id = this.articles.length - 1

        return { added:{ id:id } }
    }

    update(id:number, article: Article){
        if(id === undefined) throw "Need to provide ID of article to update it"
        const oldArticle = this.articles[id]
        if(oldArticle  === undefined) throw `Could not find article of ID ${id}`

        this.articles[id] = article
        return { updated:{ id:article.id } }
    }

    delete(id: number){
        if(id === undefined) throw "Need to provide ID of article"
        const article = this.articles[id]
        if(article === undefined) throw `Could not find article of ID ${id}`

        delete this.articles[id]
        return { deleted:{ id:id }, article:article }
    }
}