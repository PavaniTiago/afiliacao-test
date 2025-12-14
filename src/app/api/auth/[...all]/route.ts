import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3333';

async function proxyAuthRequest(request: NextRequest, pathSegments: string[]) {
  const authPath = pathSegments.join('/');
  const url = new URL(`/api/auth/${authPath}`, BACKEND_URL);

  request.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const cookieHeader = allCookies.map(c => `${c.name}=${c.value}`).join('; ');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Origin': BACKEND_URL,
  };

  if (cookieHeader) {
    headers['Cookie'] = cookieHeader;
  }

  const fetchOptions: RequestInit = {
    method: request.method,
    headers,
    cache: 'no-store',
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    try {
      const body = await request.text();
      if (body) {
        fetchOptions.body = body;
      }
    } catch {
    }
  }

  try {
    const response = await fetch(url.toString(), fetchOptions);

    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'transfer-encoding') {
        responseHeaders.set(key, value);
      }
    });

    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      responseHeaders.set('set-cookie', setCookieHeader);
    }

    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to connect to authentication server' },
      { status: 502 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ all: string[] }> }
) {
  const { all } = await params;
  return proxyAuthRequest(request, all);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ all: string[] }> }
) {
  const { all } = await params;
  return proxyAuthRequest(request, all);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ all: string[] }> }
) {
  const { all } = await params;
  return proxyAuthRequest(request, all);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ all: string[] }> }
) {
  const { all } = await params;
  return proxyAuthRequest(request, all);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ all: string[] }> }
) {
  const { all } = await params;
  return proxyAuthRequest(request, all);
}
