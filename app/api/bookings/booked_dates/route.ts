import dbConnect from "@/backend/config/dbConnect";
import { getRoomBookedDates } from "@/backend/controllers/bookingControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.get(getRoomBookedDates);

export async function GET(req: NextRequest, ctx: RequestContext) {
  return router.run(req, ctx) as Promise<Response>;
}
