/* eslint-disable react/prop-types */
const Container = ({ children }) => {
  return (
    <div className='xl:container mx-auto xl:px-24 lg:px-12 md:px-10 sm:px-5 px-3'>
      {children}
    </div>
  )
}

export default Container
