import { useState, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'
import AlertContext from '../../context/alert/AlertContext'

function UserSearch() {
  const [text, setText] = useState('')

  const { setAlert } = useContext(AlertContext)
  const { users, searchUsers, clearUsers } = useContext(GithubContext)

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(text === '') {
      setAlert('Please enter something', 'error')
    } else {
      searchUsers(text)
      setText('')
    }
  }

  return (
    <div className='grid grid-cols-1 xl:grid-col-2 lg:grid-cols-2 md:grid-col-2 mb-8 gap-8'>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input type="text" placeholder='Search' value={text} onChange={handleChange} className="w-full pr-40 bg-gray-200 input input-md text-black" />
              <button type='submit' className="absolute top-0 right-0 rounded-l-none w-36 btn-md">Go</button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button className='btn btn-ghost btn-md' onClick={clearUsers}>Clear</button>
        </div>
      )}
    </div>
  )
}

export default UserSearch