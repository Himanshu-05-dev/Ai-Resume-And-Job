const { GoogleGenAI} = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require('zod-to-json-schema')

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEN_API_KEY
});


const interviewReportSchema = z.object({
    
    matchScore:z.number().describe("A score between 1 to 100 indication how well the candidate profile"),
    
    technicalQuestions: z.array(z.object({
        question:z.string().describe("The technical question can be asked in the interview"),
        intention:z.string().describe("The intentionm of the interviewer behind asking this question"),
        answer:z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical question that can be asked in the interview along with their intention"),
    behaviouralQuestions: z.array(z.object({
        question:z.string().describe("The technical question can be asked in the interview"),
        intention:z.string().describe("The intentionm of the interviewer behind asking this question"),
        answer:z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioural question that can asked in the interview along with their intention"),
    skillsGap:z.array(z.object({
        skill:z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low","medium",'high']).describe("The severity of this skill gap")
    })).describe("List of all skill gaps int he candidate's profile along with their gap"),
    PreparationPlan:z.array(z.object({
        day:z.number().describe("The day number in the preparation plan, satrting from 1"),
        focus:z.string().describe("The main focus of this day in the preparation plan to follow thw preparation"),
        tasks:z.string().describe("A day-wise preparation plan for the candiadate to follow")
    })).describe("A day-wise preparation plan for the candiadate to follow for the interview."),
    title:z.string().describe("A title for the interview report")


})

async function generateInterviewReport({resume, selfDescription, jobDescription}){

    const prompt =`Genearte an interview report for a candidate with the following details:
        Resume: ${resume},
        Self Description: ${selfDescription},
        Job Description: ${jobDescription}
    `

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            responseSchema:zodToJsonSchema(interviewReportSchema)
        }
    })

    return JSON.parse(response.text)

}

module.exports = generateInterviewReport