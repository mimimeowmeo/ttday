import dbConnect from "@/backend/config/dbConnect";
import { updateProfile } from "@/backend/controllers/authControllers";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser).put(updateProfile);

export async function PUT(req: NextRequest, ctx: RequestContext) {
  return router.run(req, ctx) as Promise<Response>;
}
