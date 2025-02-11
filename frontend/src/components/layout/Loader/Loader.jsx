import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <>
      <div className="fixed top-0 z-50 grid w-full h-full text-primary place-content-center bg-background ">
        <Loader2 className="duration-1000 animate-spin" />
      </div>
    </>
  );
};

export default Loader;
