import Container from "../Container"

const Footer = () => {
  return (
    <footer className='bg-[#111827]'>
      <Container>
        <div className='text-center py-5'>
          <p className='text-white text-lg'>
            © {new Date().getFullYear()} All rights reserved. Developed by{' '}
            <a
              href='https://github.com/devfardin'
              target='_blank'
              rel='noopener noreferrer'
              className='gradient-text'
            >
              Fardin Ahmed
            </a>
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer