import { NextRequest, NextResponse } from "next/server";
import Room, { IReview, IRoom } from "../models/room";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import ApiFilters from "../utils/apiFilters";
import booking from "../models/booking";

//Get all rooms => /api/rooms
export const allRooms = catchAsyncErrors(async (req: NextRequest) => {
  const resPerPage = 4;

  // const rooms = await Room.find();

  const { searchParams } = new URL(req.url);

  const queryStr = Array.from(searchParams.entries()).reduce<{
    [key: string]: string;
  }>((acc, [key, val]) => {
    acc[key] = val;
    return acc;
  }, {});

  const roomsCount = await Room.countDocuments();

  const apiFilters = new ApiFilters(Room, queryStr).search().filter();

  let rooms: IRoom[] = await apiFilters.query;
  const filteredRoomsCount = rooms.length;

  apiFilters.pagination(resPerPage);
  rooms = await apiFilters.query.clone();

  return NextResponse.json({
    success: true,
    roomsCount,
    filteredRoomsCount,
    resPerPage,
    rooms,
  });
});

//Create new room => /api/admin/rooms
export const newRoom = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const room = await Room.create(body);

  return NextResponse.json({ success: true, room });
});

//Get room details => /api/rooms/:id
export const getRoomDetails = catchAsyncErrors(
  async (req: NextRequest, { params: { id } }: { params: { id: string } }) => {
    const room = await Room.findById(id).populate("reviews.user");

    if (room) return NextResponse.json({ success: true, room });
    else throw new ErrorHandler("Room not found", 404);
  }
);

//Update room details => /api/admin/rooms/:id
export const updateRoom = catchAsyncErrors(
  async (req: NextRequest, { params: { id } }: { params: { id: string } }) => {
    let room = await Room.findById(id);
    if (!room) throw new ErrorHandler("Room not found", 404);

    const body = await req.json();

    room = await Room.findByIdAndUpdate(id, body, { new: true });

    return NextResponse.json({ success: true, room });
  }
);

//Delete room => /api/admin/rooms/:id
export const deleteRoom = catchAsyncErrors(
  async (req: NextRequest, { params: { id } }: { params: { id: string } }) => {
    let room = await Room.findById(id);
    if (!room) throw new ErrorHandler("Room not found", 404);

    await room.deleteOne();

    return NextResponse.json({ success: true });
  }
);

// Create/Update room review  =>  /api/reviews
export const createRoomReview = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();
  const { rating, comment, roomId } = body;

  const review = {
    user: req.user._id,
    rating: Number(rating),
    comment,
  };

  const room = await Room.findById(roomId);

  const isReviewed = room?.reviews?.find(
    (r: IReview) => r.user?.toString() === req?.user?._id?.toString()
  );

  if (isReviewed) {
    room?.reviews?.forEach((review: IReview) => {
      if (review.user?.toString() === req?.user?._id?.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    room.reviews.push(review);
    room.numOfReviews = room.reviews.length;
  }

  room.ratings =
    room?.reviews?.reduce(
      (acc: number, item: { rating: number }) => item.rating + acc,
      0
    ) / room?.reviews?.length;

  await room.save();

  return NextResponse.json({
    success: true,
  });
});

// Can user review room  =>  /api/reviews/can_review
export const canReview = catchAsyncErrors(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");

  const bookings = await booking.find({ user: req.user._id, room: roomId });

  const canReview = bookings?.length > 0;

  return NextResponse.json({
    canReview,
  });
});
