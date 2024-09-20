'use client';

import React, { useState } from 'react';

export default function Home() {
  const [result, setResult] = useState<string>('');

  const handleJSONSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('/api/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    });

    const data = await response.json();
    setResult(JSON.stringify(data, null, 2));
  };

  const handleFormDataSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    Object.entries(formDataInput).forEach(([key, value]) => {
      formData.append(key, value);
    });
    //1.  Object.entries(formDataInput).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });
    //2.  for (const key in formDataInput) {
    //   formData.append(key, formDataInput[key as keyof typeof formDataInput]);
    // }

    const response = await fetch('/api/form', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setResult(JSON.stringify(data, null, 2));
  };

  const handleURLEncodedSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const urlEncodedData = new URLSearchParams(urlDataInput).toString();

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

  const [json, setJson] = useState({name:'', email:''})
  const [formDataInput, setFormDataInput] = useState({name:'', email:''})
  const [urlDataInput, setUrlDataInput] = useState({name:'', email:''})

  const handleJsonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJson((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataInput((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleUrlDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlDataInput((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  return (
    <div>
      <h1>Controlled Form Handling Examples</h1>

      <h2>1. JSON</h2>
      <form onSubmit={handleJSONSubmit}>
        <input type="text" name="name" placeholder="Name" value={json.name} onChange={handleJsonChange} required />
        <input type="email" name="email" placeholder="Email"  value={json.email} onChange={handleJsonChange} required />
        <button type="submit">Submit (JSON)</button>
      </form>

      <h2>2. FormData</h2>
      <form onSubmit={handleFormDataSubmit}>
        <input type="text" name="name" placeholder="Name" value={formDataInput.name} onChange={handleFormDataChange} required />
        <input type="email" name="email" placeholder="Email" value={formDataInput.email} onChange={handleFormDataChange} required />
        <button type="submit">Submit (FormData)</button>
      </form>

      <h2>3. URL-encoded</h2>
      <form onSubmit={handleURLEncodedSubmit}>
        <input type="text" name="name" placeholder="Name"  value={urlDataInput.name} onChange={handleUrlDataChange} required />
        <input type="email" name="email" placeholder="Email"   value={urlDataInput.email} onChange={handleUrlDataChange} required />
        <button type="submit">Submit (URL-encoded)</button>
      </form>

      <h2>Result:</h2>
      <pre>{result}</pre>
    </div>
  );
}