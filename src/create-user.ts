import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { prisma } from './database';

type IUserDTO = {
  name: string
  username: string
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const { name, username } = JSON.parse(event.body!) as IUserDTO

  const findByUsername = await prisma.user.findUnique({
    where: { username }
  });

  if (findByUsername) {

    return {
      statusCode: 400,
      body: JSON.stringify({
        status: 400,
        message: 'Username already exists'
      })
    }
  }

  const result = await prisma.user.create({
    data: {
      name, username
    }
  })

  return {
    statusCode: 201,
    body: JSON.stringify(result)
  }
}