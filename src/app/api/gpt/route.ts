import OpenAIApi from 'openai';
import { NextResponse } from 'next/server';
import Error from 'next/error';

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        error: 'OpenAI API key not configured!',
      },
      { status: 500 },
    );
  }

  try {
    const req = await request.json();
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: req.prompt }],
      model: 'gpt-3.5-turbo',
    });

    const result = completion.choices[0].message.content;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return NextResponse.json({ error: error.response.data }, { status: 500 });
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return NextResponse.json(
        { error: 'An error occurred during your request.' },
        { status: 500 },
      );
    }
  }
}
