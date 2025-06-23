import User from '@/models/User';
import dbConnect from '@/lib/mongodb';

export async function GET() {
  await dbConnect();
  const users = await User.find({});
  return Response.json({ users });
}