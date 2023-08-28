export default function TableResponsive() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
      <div className="bg-white space-y-3 p-4 rounded-lg shadow">
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-1/2">
            <a
              href="/#"
              className="font-bold text-blue-500 hover:underline line-clamp-2 w-full"
            >
              Kring New Fit office chair, mesh + PU, black Kring New Fit office
              chair, mesh + PU, black Kring New Fit office chair, mesh + PU,
              black
            </a>
          </div>
          <div className="text-gray-500">10/10/2021</div>
          <div>
            <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
              Delivered
            </span>
          </div>
        </div>
        <div className="text-sm font-medium text-black">$200.00</div>
      </div>
      <div className="bg-white space-y-3 p-4 rounded-lg shadow">
        <div className="flex items-center space-x-2 text-sm">
          <div>
            <a href="/#" className="text-blue-500 font-bold hover:underline">
              #1001
            </a>
          </div>
          <div className="text-gray-500">10/10/2021</div>
          <div>
            <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">
              Shipped
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-700">
          Kring New Fit office chair, mesh + PU, black
        </div>
        <div className="text-sm font-medium text-black">$200.00</div>
      </div>
      <div className="bg-white space-y-3 p-4 rounded-lg shadow">
        <div className="flex items-center space-x-2 text-sm">
          <div>
            <a href="/#" className="text-blue-500 font-bold hover:underline">
              #1002
            </a>
          </div>
          <div className="text-gray-500">10/10/2021</div>
          <div>
            <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">
              Canceled
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-700">
          Kring New Fit office chair, mesh + PU, black
        </div>
        <div className="text-sm font-medium text-black">$200.00</div>
      </div>
    </div>
  );
}
