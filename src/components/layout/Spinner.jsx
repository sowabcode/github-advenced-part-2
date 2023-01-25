import spinner from '../assets/images/spinner.gif'

function Spinner() {
  return (
    <div className='w-100 mt-15 '>
      <img src={spinner} width="250" alt="Loading..." className='text-center mx-auto' />
    </div>
  )
}

export default Spinner