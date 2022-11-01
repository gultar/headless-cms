import { MongoStorage } from './mongo-storage.ts'
import { Article } from '../../definitions.ts'
import {
    Collection,
} from "https://deno.land/x/mongo@v0.31.1/mod.ts"
import { assertEquals } from 'https://deno.land/std@0.152.0/testing/asserts.ts'

const collectionName = "test-collection"

const article: Article = {
    title:"Test article",
    body:"This is a test article",
    author:"Sacha-Olivier Dulac",
    created:Date.now(),
    id: 1
}

const db = new MongoStorage("Test")
await db.start("mongodb://127.0.0.1:27017")
    
db.createCollection(collectionName)

Deno.test("Mongo Storage", async(test)=>{
    await test.step("Adds a new article", async ()=>{
        const added = await db.add(article, collectionName)
    })

    await test.step("Gets selected article", async ()=>{
        const foundArticle = await db.get(article.id, collectionName)
        if(foundArticle === undefined) throw `Could not find article of id ${article.id}`
    })

    await test.step("Gets all articles listed", async ()=>{
        const allArticles = await db.getAll(collectionName)
        const numberOfArticles = Object.keys(allArticles).length
        assertEquals(numberOfArticles, 1)
    })

    await test.step("List collection names", async ()=>{
        const collectionNames = await db.getCollectionNames()
    })

    await test.step('Has collection', async ()=>{
        const hasCollection = await db.hasCollection(collectionName)
        assertEquals(hasCollection, true)
    })

    await test.step('Has specific article', async ()=>{
        const hasArticle = await db.hasEntry(article.id, collectionName)
        assertEquals(hasArticle, true)
    })

    await test.step("Updates article", async()=>{
        const existingArticle = await db.get(article.id,  collectionName)
        if(existingArticle == undefined) throw "Article to update not found"
        existingArticle.body = "This is a modified test article"
        const isUpdated = await db.update(article, collectionName)
    })

    await test.step("Deletes article", async ()=>{
        await db.delete(article.id, collectionName)
    })


})

// Deno.test("Adds a new article", async ()=>{
//     const added = await db.add(article, collectionName)
// })

// Deno.test("Gets selected article", async ()=>{
//     const foundArticle = await db.get(article.id, collectionName)
//     if(foundArticle === undefined) throw `Could not find article of id ${article.id}`
// })

// Deno.test("Gets all articles listed", async ()=>{
//     const allArticles = await db.getAll(collectionName)
//     const numberOfArticles = Object.keys(allArticles).length
//     assertEquals(numberOfArticles, 1)
// })

// Deno.test("List collection names", async ()=>{
//     const collectionNames = await db.getCollectionNames()
// })

// Deno.test('Has collection', async ()=>{
//     const hasCollection = await db.hasCollection(collectionName)
//     assertEquals(hasCollection, true)
// })

// Deno.test('Has specific article', async ()=>{
//     const hasArticle = await db.hasEntry(article.id, collectionName)
//     assertEquals(hasArticle, true)
// })


// Deno.test("Updates article", async()=>{
//     const existingArticle = await db.get(article.id,  collectionName)
//     if(existingArticle == undefined) throw "Article to update not found"
//     existingArticle.body = "This is a modified test article"
//     const isUpdated = await db.update(article, collectionName)
// })

// Deno.test("Deletes article", async ()=>{
//     await db.delete(article.id, collectionName)
// })
