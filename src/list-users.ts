import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { prisma } from './database'


export const handler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  let result = await prisma.user.findMany();

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  }
}