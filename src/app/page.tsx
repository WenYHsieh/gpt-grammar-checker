'use client';

import { useRef, useState } from 'react';

export default function Home() {
  const textareaEle = useRef<HTMLTextAreaElement>(null);
  const [result, setResult] = useState('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (textareaEle.current === null) return;
    const { value } = textareaEle.current;
    if (!value) return;
    const res = await fetch('/api/gpt', {
      method: 'post',
      body: JSON.stringify({
        prompt: `please help with my English grammar, and also return with  explanation, here's the sentence: ${value}`,
      }),
    });

    const data = await res.json();
    setResult(data.result);
  };

  return (
    <main className='flex flex-col items-center justify-between p-24'>
      <h1>GPT Grammar Checker</h1>
      <form onSubmit={handleSubmit}>
        <h2>Input sentence:</h2>
        <br />
        <textarea ref={textareaEle}></textarea>
        <button type='submit'>Execute</button>
      </form>
      <section>
        <h2>Result:</h2>
        <h3>{result}</h3>
      </section>
    </main>
  );
}
