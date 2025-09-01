"use client";

const Navigation = () => {
  return (
    <div className="flex flex-col items-start justify-start p-5 gap-2.5 mt-1 ml-2">
      {/* Address Bar */}
      <div className="flex flex-row justify-start gap-2.5">
        <p className="text-base font-semibold text-gray-700 cursor-pointer">Home</p>
        <p className="text-base font-semibold text-gray-700">{'>'}</p>
        <p className="text-base font-bold text-gray-700 cursor-pointer">Add to Cart</p>
      </div>

      {/* Subtext */}
      <p className="text-sm text-gray-700">
        Please fill in the details and click place order to complete your purchase
      </p>

      {/* Already Login */}
      <div className="flex flex-row justify-start text-lg">
        <p className="text-sm text-gray-700">Already registered?&nbsp;</p>
        <p className="text-sm text-purple-600 cursor-pointer">Please Login Here</p>
      </div>
    </div>
  );
};

export default Navigation;
