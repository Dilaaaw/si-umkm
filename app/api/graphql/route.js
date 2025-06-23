import { graphql } from 'graphql';
import { schema, rootValue } from '@/graphql/schema';

export async function POST(req) {
  const { query, variables } = await req.json();

  const result = await graphql({
    schema,
    source: query,
    rootValue,
    variableValues: variables,
  });

  return Response.json(result);
}
