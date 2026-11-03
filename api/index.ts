import type { Request, Response } from 'express';
import { createApp } from '../src/main';

let handler: ((request: Request, response: Response) => void) | undefined;

export default async function vercelHandler(
  request: Request,
  response: Response,
): Promise<void> {
  if (!handler) {
    const app = await createApp();
    handler = app.getHttpAdapter().getInstance();
  }

  handler!(request, response);
}
