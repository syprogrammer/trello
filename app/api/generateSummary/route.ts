import {NextResponse} from 'next/server'
import OpenAI from 'openai'


export async function POST(request:Request){
    //todos in the body of the POST req
    const {todos} = await request.json()
    console.log(todos)

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    //communicate with openAI GPT
    const response = await openai.chat.completions.create({
        model:"gpt-3.5-turbo",
        temperature:0.8,
        n:1,
        stream:false,
        messages:[
            {
                role:"system",
                content:`When responding , welcome the user always as Mr.syprogrammer and say welcome to sytrello
                Limit the response to 200 characters
                `
            }
        ]
    })
}