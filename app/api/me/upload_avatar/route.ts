import dbConnect from "@/backend/config/dbConnect";
import { uploadAvatar } from "@/backend/controllers/authControllers";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { RequestContext } from "next/dist/server/base-server";
import { NextRequest } from "next/server";

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser).put(uploadAvatar);

export async function PUT(req: NextRequest, ctx: RequestContext) {
  return router.run(req, ctx) as Promise<Response>;
}
