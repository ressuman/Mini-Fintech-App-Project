import { Card, CardBody } from "@nextui-org/react";
import { LineChart } from "../Chart/LineChart";
import PropTypes from "prop-types";

export const CardStats = ({ text, label }) => {
  return (
    <Card className="min-w-44" shadow="none">
      <CardBody>
        <h3 className={`font-bold text-2xl ${text ? "" : "text-slate-300"}`}>
          {text ? `GH₵${text}` : "No data"}
        </h3>
        <p className="mt-2 text-xl text-slate-400">{label}</p>
      </CardBody>
    </Card>
  );
};

CardStats.propTypes = {
  text: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default function Content() {
  return (
    <div className="h-full p-5">
      <div className="grid grid-cols-4 gap-2 mb-10 items-center justify-center">
        <div>
          <p className="text-sm font-bold uppercase">Your total balance</p>
          <p className="mt-4 text-sm text-slate-400">Stats</p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase">Your savings balance</p>
          <p className="mt-4 text-sm text-slate-400">Stats</p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase">Your investments</p>
          <p className="mt-4 text-sm text-slate-400">Stats</p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase">Your total debt</p>
          <p className="mt-4 text-sm text-slate-400">Stats</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 items-center justify-center">
        <CardStats text="234,234" label="Total Balance" />
        <CardStats text="100,000" label="Savings Balance" />
        <CardStats text="50,000" label="Investments" />
        <CardStats text="20,000" label="Total Debt" />
      </div>
      <div className="mt-10">
        <LineChart />
      </div>
    </div>
  );
}
