'use client';

import { useState } from 'react';

export default function Home() {
  const [result, setResult] = useState<string>('');

  const handleJSONSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const jsonData = Object.fromEntries(formData);

    const response = await fetch('/api/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    });

    const data = await response.json();
    setResult(JSON.stringify(data, null, 2));
  };

  const handleFormDataSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await fetch('/api/form', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setResult(JSON.stringify(data, null, 2));
  };

  const handleURLEncodedSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const urlEncodedData = new URLSearchParams(formData as any).toString();

    const response = await fetch('/api/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: urlEncodedData,
    });

    const data = await response.json();
    setResult(JSON.stringify(data, null, 2));
  };

  return (
    <div>
      <h1>Form Handling Examples</h1>

      <h2>1. JSON</h2>
      <form onSubmit={handleJSONSubmit}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <button type="submit">Submit (JSON)</button>
      </form>

      <h2>2. FormData</h2>
      <form onSubmit={handleFormDataSubmit}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <button type="submit">Submit (FormData)</button>
      </form>

      <h2>3. URL-encoded</h2>
      <form onSubmit={handleURLEncodedSubmit}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <button type="submit">Submit (URL-encoded)</button>
      </form>

      <h2>Result:</h2>
      <pre>{result}</pre>
    </div>
  );
}