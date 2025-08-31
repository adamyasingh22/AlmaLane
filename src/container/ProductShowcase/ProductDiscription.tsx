export default function ProductDescription() {
  return (
    <div className="w-[95%] mx-auto my-10 px-5 flex flex-col">
      {/* Heading */}
      <div className="flex items-center gap-2 py-5">
        <div className="w-2 h-8 rounded-full bg-gradient-to-b from-violet-500 to-violet-700" />
        <h1 className="text-xl font-bold text-gray-700">Product Description</h1>
      </div>

      {/* Content */}
      <div className="flex justify-between gap-[5%] flex-wrap p-5">
        {/* Left content */}
        <div className="w-[55%] max-md:w-full">
          {/* Tabs */}
          <div className="flex gap-8 mb-4">
            <div className="relative font-semibold text-black cursor-pointer after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[2px] after:bg-black after:transition-all">
              Description
            </div>
            <div className="relative font-normal text-gray-500 cursor-pointer hover:text-black">
              User comments{" "}
              <strong className="text-violet-600">(31)</strong>
            </div>
            <div className="relative font-normal text-gray-500 cursor-pointer hover:text-black">
              Question & Answer{" "}
              <strong className="text-violet-600">(4)</strong>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-7 mb-8 mt-5">
            100% Bio-washed Cotton – makes the fabric extra soft & silky.
            Flexible ribbed crew neck. Precisely stitched with no pilling & no
            fading. Provide all-time comfort. Anytime, anywhere. Infinite range
            of matte-finish HD prints.
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-3 gap-4 bg-gray-100 p-5 rounded-xl">
            <div className="text-left">
              <div className="text-xs text-gray-400">Fabric</div>
              <div className="text-sm font-medium text-gray-800">
                Bio-washed Cotton
              </div>
            </div>
            <div className="text-left">
              <div className="text-xs text-gray-400">Pattern</div>
              <div className="text-sm font-medium text-gray-800">Printed</div>
            </div>
            <div className="text-left">
              <div className="text-xs text-gray-400">Fit</div>
              <div className="text-sm font-medium text-gray-800">Regular-fit</div>
            </div>
            <div className="text-left">
              <div className="text-xs text-gray-400">Neck</div>
              <div className="text-sm font-medium text-gray-800">Round Neck</div>
            </div>
            <div className="text-left">
              <div className="text-xs text-gray-400">Sleeve</div>
              <div className="text-sm font-medium text-gray-800">Half-sleeves</div>
            </div>
            <div className="text-left">
              <div className="text-xs text-gray-400">Style</div>
              <div className="text-sm font-medium text-gray-800">Casual Wear</div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="relative w-[40%] min-w-[300px] rounded-xl overflow-hidden bg-gray-200 p-2 max-md:w-full max-md:mt-5">
          <video
            src="https://videocdn.cdnpk.net/videos/ba5d2459-4994-49fd-a66a-436248a1776a/horizontal/previews/clear/large.mp4?token=exp=1744639254~hmac=0a569a7e80920b9d24c42ae0b5cbf3873c19f7c2693e6370848ad1d0a62ce80d"
            muted
            autoPlay
            loop
            className="w-full h-auto block"
          />
          <span className="absolute top-2 right-3 text-xs bg-black/50 px-2 py-1 rounded-md text-white">
            1:00 M
          </span>

          {/* Play button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-12 h-12 rounded-full flex items-center justify-center">
            <div className="border-l-[10px] border-l-black border-y-[6px] border-y-transparent" />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-black/40 to-transparent text-white">
            <div className="text-base">
              Raven Hoodie with black colored design
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
