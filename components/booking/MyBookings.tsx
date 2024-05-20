"use client";

import { IBooking } from "@/backend/models/booking";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import React from "react";

interface Props {
  data: {
    bookings: IBooking[];
  };
}

const MyBookings = ({ data }: Props) => {
  const bookings = data?.bookings;

  const setBookings = () => {
    const data: { columns: any[]; rows: any[] } = {
      columns: [
        // {
        //   label: "ID",
        //   field: "id",
        //   sort: "asc",
        // },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Check In",
          field: "checkin",
          sort: "asc",
        },
        {
          label: "Check Out",
          field: "checkout",
          sort: "asc",
        },
        {
          label: "Amount Paid",
          field: "amountpaid",
          sort: "asc",
        },
        {
          label: "Paid At",
          field: "paidat",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    bookings
      ?.sort(
        (a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime()
      )
      ?.forEach((booking) => {
        data?.rows?.push({
          // id: booking._id,
          name: booking?.room?.name,
          checkin: new Date(booking?.checkInDate).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          checkout: new Date(booking?.checkOutDate).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          amountpaid: `$${booking?.amountPaid}`,
          paidat: new Date(booking?.paidAt).toLocaleString("en-US"),
          actions: (
            <>
              <Link
                href={`/bookings/${booking._id}`}
                className="btn btn-primary"
              >
                <i className="fa fa-eye" />
              </Link>
              <Link
                href={`/bookings/invoice/${booking._id}`}
                className="btn btn-success ms-2"
              >
                <i className="fa fa-receipt" />
              </Link>
            </>
          ),
        });
      });

    return data;
  };

  return (
    <div className="container">
      <h1 className="my-5">My Bookings</h1>
      <MDBDataTable
        data={setBookings()}
        className="px-3"
        bordered
        striped
        hover
      />
    </div>
  );
};

export default MyBookings;
