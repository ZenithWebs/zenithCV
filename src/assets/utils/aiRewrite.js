import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function rewriteText(text) {
  const prompt = `Rewrite this resume content professionally:\n\n${text}`;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 500,
  });

  return response.data.choices[0].text.trim();
}
