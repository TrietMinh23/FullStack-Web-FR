export default function ItemTableResponsive() {
  return (
    <div className="bg-white p-4 shadow">
      <div className="flex items-center text-sm">
        <div className="flex max-md:justify-between">
          <img
            src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
            alt="image"
            style={{ width: "20%" }}
          />
          <div className="ml-3 mt-2">
            <span className="flex items-center">
              Kring New Fit office chair, mesh + PU, black
            </span>
            <div className="flex justify-between mt-2">
              <div className="price text-sm font-medium text-black">
                $200.00
              </div>
              <div className="quantity">x1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
