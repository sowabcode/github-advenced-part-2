import { createContext, useReducer } from "react";

import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get fetch User
  // const fetchUsers = async () => {
  //   setLoading()

  //   const response = await fetch(`${GITHUB_URL}/users`, {
  //     headers: {
  //       Authorization: `token ${GITHUB_TOKEN}`
  //     }
  //   })

  //   const data = await response.json()
  //   dispatch({
  //     type: 'GET_USERS',
  //     payload: data
  //   })
  // }

  // Get search users results
  const searchUsers = async (text) => {
    setLoading()

    const param = new URLSearchParams({
      q: text
    })

    const response = await fetch(`${GITHUB_URL}/search/users?${param}`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`
        },
    })
    const { items } = await response.json()

    dispatch({
      type: 'GET_USERS',
      payload: items
    })
  }

  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' })
  const setLoading = () => dispatch({ type: 'SET_LOADING' })

  return <GithubContext.Provider value={{
    users: state.users,
    loading: state.loading,
    // fetchUsers
    searchUsers,
    clearUsers
  }}>
    { children }
  </GithubContext.Provider>
}

export default GithubContext;