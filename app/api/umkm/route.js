import sanitizeHtml from 'sanitize-html';

export async function POST(req) {
  const body = await req.json();
  const cleanNama = sanitizeHtml(body.nama);

}
