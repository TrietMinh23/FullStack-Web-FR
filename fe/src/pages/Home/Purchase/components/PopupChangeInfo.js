import axios from "axios";
import { useEffect, useState } from "react";

export default function PopupChangeInfo({ changeFunc, close, open }) {
  useEffect(() => {
    var citis = document.getElementById("city");
    var districts = document.getElementById("district");
    var wards = document.getElementById("ward");
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((res) => {
        const data = res.data;

        for (const x of data) {
          citis.options[citis.options.length] = new Option(x.Name, x.Name);
        }

        citis.onchange = function () {
          districts.length = 1;
          wards.length = 1;
          if (this.value != "") {
            const result = data.filter((n) => n.Name === this.value);

            for (const k of result[0].Districts) {
              districts.options[districts.options.length] = new Option(
                k.Name,
                k.Name
              );
            }
          }
        };

        districts.onchange = function () {
          wards.length = 1;
          const dataCity = data.filter((n) => n.Name === citis.value);
          if (this.value != "") {
            const dataWards = dataCity[0].Districts.filter(
              (n) => n.Name === this.value
            )[0].Wards;

            for (const w of dataWards) {
              wards.options[wards.options.length] = new Option(w.Name, w.Name);
            }
          }
        };
      })
      .catch((err) => console.log(err));
  });

  return (
    <div className="container absolute z-10 modal">
      <div className="wrapper p-6">
        {" "}
        <div className="title">
          <h1 className="text-2xl">New address</h1>
        </div>
        <div className="form w-full pt-4">
          <div className="row flex w-full md:flex-row flex-col">
            <div className="col flex-1 max-md:mb-4 border border-gray-300 rounded-md box-border shadow-inner transition-all duration-300">
              <input
                placeholder="Full name"
                className="w-full p-2.5 bg-transparent outline-none text-base min-w-0 text-gray-700"
                name="name"
                onChange={changeFunc}
              ></input>
            </div>
            <div className="w-4"></div>
            <div className="col flex-1 border border-gray-300 rounded-md box-border shadow-inner transition-all duration-300">
              <input
                placeholder="Phone number"
                className="w-full p-2.5 bg-transparent outline-none text-base min-w-0 text-gray-700"
                name="phone"
                onChange={changeFunc}
              ></input>
            </div>
          </div>
          <div className="row pt-4">
            <div>
              <div className="container">
                <div className="flex md:flex-row flex-col">
                  <select
                    className="form-select form-select-sm mb-3 w-full p-2.5 bg-transparent outline-none text-base min-w-0 text-gray-700 border border-gray-300 rounded-md box-border shadow-inner transition-all duration-300"
                    id="city"
                    aria-label=".form-select-sm"
                    name="city"
                    onChange={changeFunc}
                  >
                    <option defaultValue="">Chọn tỉnh thành</option>
                  </select>
                  <div className="w-6"></div>
                  <select
                    className="form-select form-select-sm mb-3 w-full p-2.5 bg-transparent outline-none text-base min-w-0 text-gray-700 border border-gray-300 rounded-md box-border shadow-inner transition-all duration-300"
                    id="district"
                    aria-label=".form-select-sm"
                    name="district"
                    onChange={changeFunc}
                  >
                    <option defaultValue="">Chọn quận huyện</option>
                  </select>
                  <div className="w-6"></div>
                  <select
                    className="form-select form-select-sm mb-3 w-full p-2.5 bg-transparent outline-none text-base min-w-0 text-gray-700 border border-gray-300 rounded-md box-border shadow-inner transition-all duration-300"
                    id="ward"
                    aria-label=".form-select-sm"
                    name="ward"
                    onChange={changeFunc}
                  >
                    <option defaultValue="">Chọn phường xã</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col border border-gray-300 rounded-md box-border shadow-inner transition-all duration-300">
            <input
              placeholder="Practical address"
              className="w-full p-2.5 bg-transparent outline-none text-base min-w-0 text-gray-700"
              name="address"
              onChange={changeFunc}
            ></input>
          </div>
          <div className="btn-group flex justify-end pt-4">
            <div className="back-btn mr-2 finish-btn py-2 px-6 bg-white hover:bg-slate-200 rounded-md text-black cursor-pointer">
              <button onClick={close}>Back</button>
            </div>
            <div className="finish-btn py-2 px-6 bg-red-500 hover:bg-red-600 rounded-md text-white cursor-pointer">
              <button onClick={open}>Finish</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
