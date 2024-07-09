import React from "react";
interface Props {
  title: string;
  footer: React.ReactNode;

  icon: React.ReactNode;
}

const CardProps: React.FC<Props> = ({ title, footer, icon }) => {
  return (
    <div
      className="bg-slate-200 border-red-300 sm:border w-full
    h-[300px] md:border mb-4 lg: rounded-md grid grid-rows-subgrid row-[1/4] p-2 "
    >
      <div className="flex items-center justify-center text-lg mb-3 font-bold dark:text-slate-200 text-center">
        <h5>{title}</h5>
      </div>
      <div className="flex justify-center items-center">{icon}</div>
      <div className="flex justify-center items-center font-bold text-6xl">
        <h1>{footer}</h1>
      </div>
    </div>
  );
};

export default CardProps;
