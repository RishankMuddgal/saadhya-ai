import model from '@/lib/googleAi'
const generateProjectTasks = async (prompt:string) =>{
    model.generationConfig = {
        responseMimeType: 'application/json' 

    }
    try{
        const result = await model.generateContent(`
            Generate and return a lost of tasks based on the provided prompt and the given JSON schema
Prompt: tell me in very strict order , ${prompt}

    **Requirements**:
      - Ensure the steps are in a clear logical order.
      - Each step must follow naturally from the previous one.
      - There must be no contradictions (e.g., no cooling before baking).
      - Keep all steps relevant to the prompt.
      - The 'due_date' should be null unless explicitly specified in the prompt.
      - Give factual data if the prompt is factual, like if it asks for names or mostly asked questions and so on.

    **Output Format**:
    - Return only a numbered list of clear, concise, step-by-step instructions.
    - Do not apply any additional schema here.
            ### Example Output:
    [
      {
        "content": "Preheat the oven to 180°C (350°F).",
        "due_date": null
      },
      {
        "content": "Mix flour, cocoa powder, baking soda, and sugar in a large bowl.",
        "due_date": null
      },
      {
        "content": "Pour the batter into a greased cake pan.",
        "due_date": null
      },
      {
        "content": "Bake for 30 minutes or until a toothpick inserted comes out clean.",
        "due_date": null
      },
      {
        "content": "Cool the cake for 10 minutes before serving.",
        "due_date": null
      }
    ]


            { temperature: 0.0, top_k: 1 }
     
    
  
            `)
              const plan = result.response.text();
                console.log('Generated Step-by-Step Plan:', plan);
            return result.response.text();
    }catch(err){
        console.log('Error generating tasks !',err);
    }
}
export {generateProjectTasks}