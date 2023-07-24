import ItemTS from "./ItemTS";

export default function TableResponsiveShoppingCart({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 md:hidden mt-3">
      {products?.map((item) => (
        <ItemTS shop={item} />
      ))}
    </div>
  );
}
