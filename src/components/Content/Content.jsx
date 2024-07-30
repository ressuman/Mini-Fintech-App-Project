import { Card, CardBody } from "@nextui-org/react";
import { LineChart } from "../Chart/LineChart";

export const CardStats = ({ text }) => {
  return (
    <Card className="min-w-64" shadow="none">
      <CardBody>
        <h3
          className={`${
            text ? "font-bold text-4xl" : "font-bold text-4xl text-slate-300"
          }`}
        >
          {text ? `$${text}` : "No data"}
        </h3>
      </CardBody>
    </Card>
  );
};

export default function Content() {
  return (
    <div className="h-full p-5">
      <div className="">
        <p className="text-3xl">Your total balance</p>
        <p className="mt-4 text-xl text-slate-400">Stats</p>
      </div>
      <div className="mt-5 flex gap-x-3">
        <CardStats text="234,234" />
        <CardStats />
        <CardStats />
      </div>
      <div className="mt-10">
        <LineChart />
      </div>
    </div>
  );
}
