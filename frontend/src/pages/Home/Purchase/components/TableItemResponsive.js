import ItemTableResponsive from "./ItemTableResponsive";

export default function TableItemResponsive() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 md:hidden mt-3">
      <ItemTableResponsive></ItemTableResponsive>
      <ItemTableResponsive></ItemTableResponsive>
      <ItemTableResponsive></ItemTableResponsive>
      <ItemTableResponsive></ItemTableResponsive>
      <ItemTableResponsive></ItemTableResponsive>
      <ItemTableResponsive></ItemTableResponsive>
    </div>
  );
}
