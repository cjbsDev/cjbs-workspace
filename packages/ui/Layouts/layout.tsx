import React from 'react'
interface LayoutsProps {
  children: React.ReactNode
}
export const Layout = ({ children }: LayoutsProps) => {
  return (
    <>
      <div>
        Header
      </div>
      <main>{children}</main>
      <footer>
        Footer
      </footer>
    </>
  )
}
