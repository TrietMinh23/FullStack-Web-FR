import { Link } from "react-router-dom";

export default function ShoppingCard({ title, price, image, id }) {
  return (
    <Link to={`/products/${id}`}>
      <article className="relative lg:p-8 p-4 card-item">
        <div className="aspect-square overflow-hidden">
          <img
            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
            src={image}
            alt=""
          />
        </div>
        <div className="mt-4 flex items-start justify-between">
          <div>
            <h3 className="text-xs font-semibold sm:text-sm md:text-base w-[110px] line-clamp-2">
              <a href="#">
                {title}
                <span className="absolute" aria-hidden="true" />
              </a>
            </h3>
            <div className="mt-2 flex items-center"></div>
          </div>
          <div className="text-right">
            <del className="mt-px text-xs font-semibold text-gray-600 sm:text-sm">
              $79.00
            </del>
            <p className="text-xs font-normal sm:text-sm md:text-base">
              ${price}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
