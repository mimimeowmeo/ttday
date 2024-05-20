import dbConnect from "@/backend/config/dbConnect";
import {
  getRoomDetails,
  updateRoom,
} from "@/backend/controllers/roomControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
  params: { id: string };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.get(getRoomDetails);
router.put(updateRoom);

export async function GET(req: NextRequest, ctx: RequestContext) {
  return router.run(req, ctx) as Promise<Response>;
}
