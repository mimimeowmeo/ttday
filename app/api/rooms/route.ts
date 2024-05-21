import dbConnect from "@/backend/config/dbConnect";
import { allRooms, newRoom } from "@/backend/controllers/roomControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

// dbConnect();

// router.get(allRooms);
// router.post(newRoom);

export async function GET(req: NextRequest, ctx: RequestContext) {
  await dbConnect();
  router.get(allRooms);

  return router.run(req, ctx) as Promise<Response>;
}
