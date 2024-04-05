import React from 'react'
import Navbar from '@/components/shared/navbar/Navbar'

const Layout = ({children} : {children : React.ReactNode}) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default Layout