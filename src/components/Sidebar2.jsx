
import MetricsCard from "./MetricCard";

const Sidebaroo = () => {
  return (
    <div className="h-[92%] fixed right-7 top-1/2 transform -translate-y-1/2 pl-8 border-l-2 border-l-dark-green flex flex-col justify-center items-center">
      <h3 className="text-white/80 text-base font-medium mb-4">Dashboard Metrics</h3>
      <MetricsCard />
    </div>
  );
};

export default Sidebaroo;
