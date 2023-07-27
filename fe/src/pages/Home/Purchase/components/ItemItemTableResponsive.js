export default function ItemItemTableResponsive({
  image,
  name,
  price,
  quantity,
}) {
  return (
    <div className="flex items-center text-sm">
      <div className="flex max-md:justify-between">
        <img src={image} alt="image" style={{ width: "20%" }} />
        <div className="ml-3 mt-2">
          <span className="flex items-center">{name}</span>
          <div className="flex justify-between mt-2">
            <div className="price text-sm font-medium text-black">${price}</div>
            <div className="quantity">x{quantity}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
