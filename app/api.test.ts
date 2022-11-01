import { assertEquals } from "https://deno.land/std@0.152.0/testing/asserts.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";

Deno.test("REST API", async (test)=>{
    const article = {
        title:"Test article",
        body:"This is a test article",
        author:"Sacha-Olivier Dulac",
        id:1,
        created:Date.now()
    }

    await test.step("GET Request on all articles",async ()=>{
        const response = await axiod.get("http://localhost:8000/articles");
    
        if(!response)throw "Could not get a response"
        if(response.status !== 200) throw response.statusText
    })

    await test.step("POST request for creating article", async () => {
        const response = await axiod.post("http://localhost:8000/articles/", article);
        
        if(!response)throw "Could not get a response"
        if(response.status !== 200) throw response.statusText
    })

    await test.step("POST request with invalid article", async () => {
        try{
            await axiod.post("http://localhost:8000/articles/", {})
        }catch(e){
            const error = e.response
            assertEquals(error.status, 500) //Need to find a better way to validate error
        }
    })

    await test.step("GET request a specific article", async () => {
        const response = await axiod.get("http://localhost:8000/articles/1");
        
        if(!response)throw "Could not get a response"
        if(response.status !== 200) throw response.statusText
    })

    await test.step("PUT request for updating article", async () => {
        const updatedArticle = article
        updatedArticle.body = "This is a modified test article"
        const response = await axiod.put("http://localhost:8000/articles/1", updatedArticle);
        
        if(!response)throw "Could not get a response"
        if(response.status !== 200) throw response.statusText
    })

    await test.step("DELETE request on created article", async () => {
        const response = await axiod.delete("http://localhost:8000/articles/1");
        
        if(!response)throw "Could not get a response"
        if(response.status !== 200) throw response.statusText
    })


})
