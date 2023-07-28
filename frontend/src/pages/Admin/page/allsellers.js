import React from 'react'
import Tracker from "../components/Tracker";
import Table from "../components/Table";

export default function Allsellers () {
  return (
    <React.Fragment>
      <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <Tracker
              text="Positive Reviews"
              smallText="This month"
              total={12}
              daily = {1}
              color="bg-green-200"
            />
            <Tracker
              text="Negative Reviews"
              smallText="This month"
              total={3}
              daily = {1}
              color="bg-red-200"
            />
            <Tracker
              text="Total income"
              smallText="This month"
              total={10122}
              daily = {1200}
              color="bg-gray-200"
            />
        </div>
        <div className="mt:inline-block hidden mt-9	">
          <Table />
        </div>
      </div>
      <div className="mt:hidden inline-block">
        <Table />
      </div>
    </React.Fragment>
  )
}

