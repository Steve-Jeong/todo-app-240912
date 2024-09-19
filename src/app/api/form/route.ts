import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // 1. JSON 방식
  if (request.headers.get('content-type') === 'application/json') {
    const jsonData = await request.json();
    console.log('JSON data:', jsonData);
    return NextResponse.json({ message: 'JSON data received', data: jsonData });
  }

  // 2. FormData 방식
  if (request.headers.get('content-type')?.includes('multipart/form-data')) {
    const formData = await request.formData();
    const formDataObj = Object.fromEntries(formData);
    console.log('FormData:', formDataObj);
    return NextResponse.json({ message: 'FormData received', data: formDataObj });
  }

  // 3. URL-encoded 방식
  if (request.headers.get('content-type') === 'application/x-www-form-urlencoded') {
    const urlEncodedData = await request.text();
    const urlEncodedObj = Object.fromEntries(new URLSearchParams(urlEncodedData));
    console.log('URL-encoded data:', urlEncodedObj);
    return NextResponse.json({ message: 'URL-encoded data received', data: urlEncodedObj });
  }

  return NextResponse.json({ error: 'Unsupported content type' }, { status: 415 });
}
