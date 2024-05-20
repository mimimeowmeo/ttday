import dbConnect from "@/backend/config/dbConnect";
import { forgotPassword } from "@/backend/controllers/authControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.post(forgotPassword);

export async function POST(req: NextRequest, ctx: RequestContext) {
  return router.run(req, ctx) as Promise<Response>;
}
