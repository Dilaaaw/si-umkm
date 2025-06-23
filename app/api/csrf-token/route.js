import { generateCSRFToken } from '@/lib/csrf';

export async function GET() {
  const token = generateCSRFToken();
  return new Response(JSON.stringify({ token }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
