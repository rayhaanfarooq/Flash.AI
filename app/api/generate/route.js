import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt =  `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow thes guidelines:
1. Create clear and concise questions for the front of the flashcard. 
2. Provide answers based on the text given, but also provide accurate and informative information related to the topic.
3. Ensure that each flashcard focuses on a single concept or piece of information. 
4. Use simple language to make the flashcards accessible to a wide range of learners. 
5. Include a variety of question types, such as definitions, examples, comparisions, and applications.
6. Avoid overly complex or ambiguous phrasing in both questions and answers. 
7. When appropriate, use mnemonics or memory aids to help reinforce information. 
8. Tailor the difficulty level of the flashcards to the users specified preferences. 
9. If given a body of text, extract the most important and relevant information for the flashcards. 
10. Aim to create a balanced set of flashcards that covers the topic comprehensively.
11. Generate 10-25 flashcards based on the breadth of the given content.
12. Only output the flashcards in the specified JSON format, nothing else.
13. Do not include any preamble or conclusionary text.
14. Strict JSON Compliance: Ensure that the output strictly adheres to the provided JSON structure. Validate that there are no extraneous characters, spaces, or text outside the specified JSON format.
15. No Formatting or Extra Information: Do not include any formatting, metadata, or additional comments. Only the JSON object containing flashcards should be output.
16. Consistent Key Naming: Use exactly the provided key names ("front" and "back") for the questions and answers in each flashcard object.
17. Data Integrity: Double-check that each flashcard object contains non-empty values for both the "front" and "back" keys. Do not leave any key values blank or null.
18. Array Structure: Ensure that the "flashcards" key maps to an array that contains all generated flashcards. The array should not include any other data or objects.
19. Error Handling: If there is an issue with the input data or if you cannot generate the required number of flashcards, output an empty JSON array ("flashcards": []) instead of providing incomplete or incorrect data.
20. No Additional Text or Explanations: Do not include any additional explanations, comments, or descriptive text. The response should be limited to the JSON object.
21. Relevance to Topic: Ensure that each question and answer is highly relevant to the provided topic or content. Focus on key concepts, important details, and essential information.
22. Clarity and Precision: Questions should be clear and specific, avoiding vague or broad queries. Answers should be precise and directly address the question posed.
23. Contextual Accuracy: Provide answers that are contextually accurate and reflect the most up-to-date and relevant information. Avoid outdated or incorrect information.
24. Variety of Question Types: Include a diverse range of question types, such as multiple-choice, true/false, fill-in-the-blank, and matching, to cover different aspects of the topic.
25. Examples and Applications: When possible, include practical examples or applications in the answers to illustrate how the concept is used or applied in real scenarios.
26. Focus on Learning Objectives: Align the questions and answers with specific learning objectives or key takeaways from the content. Ensure that each flashcard supports the overall learning goals.
27. Conciseness: Keep questions and answers concise to ensure they are easily digestible. Avoid unnecessary details or overly complex explanations.
28. Consistent Terminology: Use consistent terminology and definitions throughout the flashcards to avoid confusion. Ensure that terminology used in questions matches that used in answers.
29. Proofreading: Ensure that questions and answers are free from grammatical errors, typos, and inaccuracies. Proofread the content for clarity and correctness.
30. Engagement: Craft questions that engage the learner and encourage active recall. Consider including questions that require critical thinking or application of knowledge.

Return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`

export async function POST(req) {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    })
    const data = await req.text()

    const completion = await openai.chat.completions.create({
        messages: [
            {role: 'system', content: systemPrompt }, 
            {role: 'user', content: data }, 
        ], 
        model: "meta-llama/llama-3.1-8b-instruct:free",
        response_format: { type: 'json_object' },
    })
    console.log(completion.choices[0].message.content)
    //Parse the JSON response from the OpenAi API
    const flashcards = JSON.parse(completion.choices[0].message.content)

    //Return the flashcards as a json response
    return NextResponse.json(flashcards.flashcards)
}


