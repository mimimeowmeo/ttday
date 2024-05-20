import Home from "@/components/Home";
import Error from "./error";
import { url } from "inspector";

export const metadata = {
  title: "HomePage - TTday",
};

const getRooms = async (searchParams: string) => {
  const urlParams = new URLSearchParams(searchParams);
  const queryStrings = urlParams.toString();

  const res = await fetch(`${process.env.API_URL}/api/rooms?${queryStrings}`, {
    cache: "no-cache",
  });
  return res.json();
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: string;
}) {
  const data = await getRooms(searchParams);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <Home data={data} />;
}
