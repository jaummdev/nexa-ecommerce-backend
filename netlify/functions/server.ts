import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import serverless from "serverless-http";
import app from "../../src/server";

// Converter o app Express para handler Netlify usando serverless-http
const serverlessHandler = serverless(app);

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // Converter o evento Netlify para o formato esperado pelo serverless-http
  const result: any = await serverlessHandler(event as any, context as any);

  return {
    statusCode: result?.statusCode || 200,
    headers: result?.headers || {},
    body: result?.body || "",
  };
};

export { handler };
