import React from 'react'
import { Outlet } from 'react-router-dom';
export default function Usemanagement () {
  return (
    <main>
      <div>
        <Outlet />
      </div>
    </main>
  )
}

