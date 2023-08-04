export default function Card({ title, icon, text, number, money, color }) {
  return (
    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
      <div
        className={`bg-clip-border mx-4 rounded-xl bg-gradient-to-r overflow-hidden text-white shadow-lg absolute mt-4 grid h-16 w-16 place-items-center`}
        style={{
          background: color,
        }}
      >
        {icon}
      </div>
      <div className="p-4 text-right">
        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
          {title}
        </p>
        <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
          {number}
        </h4>
      </div>
      <div className="border-t border-blue-gray-50 p-4">
        <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
          {text} {money}
        </p>
      </div>
    </div>
  );
}
