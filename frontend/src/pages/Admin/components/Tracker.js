export default function Tracker({
  total = 0,
  daily = 0,
  text,
  smallText,
  color,
  icon
}) {
  const formatNumber = (number) => {
    if (number >= 1000000000) {
      return (number / 1000000000).toFixed(1) + " tỉ";
    } else if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + " triệu";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + " K";
    } else {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  };

  const formattedTotal = formatNumber(total);
  const formattedDaily = formatNumber(daily);

  return (
    <div className={color + " w-auto h-fit rounded-xl text-xl"}>
      <div className="my-4 mx-4">
        <h1 className="pb-0 leading-none">{text}</h1>
        <div class="flex items-center text-4xl py-4">
          {icon &&
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8 mr-2 mt-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          }

          <span>{formattedTotal}</span>
        </div>
        <hr class="h-px mb-2 bg-gray-200 border-0 dark:bg-gray-700 " />
        <div className="flex">
          <p>{smallText}:</p>
          <div className="ml-2">{formattedDaily}</div>
        </div>
      </div>
    </div>
  );
}
