import dbConnect from "@/backend/config/dbConnect";
import { webhookCheckout } from "@/backend/controllers/paymentControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.post(webhookCheckout);

export async function POST(req: NextRequest, ctx: RequestContext) {
  return router.run(req, ctx) as Promise<Response>;
}
