import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <>
      <div className="w-full grid place-content-center h-screen top-0 z-50 fixed bg-slate-900 ">
        <InfinitySpin
          class="text-blue-500"
          width='200'
          color='#00BCD4'
        />
      </div>
    </>
  );
};

export default Loader;
