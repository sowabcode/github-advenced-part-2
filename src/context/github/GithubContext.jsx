import { createContext, useReducer } from "react";

import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  const initialState = {
    user: {},
    users: [],
    repos: {},
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

  // Get single user
  const getUser = async (username) => {
    setLoading()

    const response = await fetch(`${GITHUB_URL}/users/${username}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    if(response.status === 400) {
      window.location = '/notfound'
    } else {
      const data = await response.json()

      dispatch({
        type: 'GET_USER',
        payload: data
      })
    }
  }

  // Get User Repos
  const getUserRepos = async (login) => {
    setLoading()

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10
    })
    
    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      headers: {
        Authorization: `${GITHUB_TOKEN}`
      }
    })
    
    const data = await response.json()
    console.log(data)
    dispatch({
      type: 'GET_REPOS',
      payload: data
    })
  } 

  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' })
  const setLoading = () => dispatch({ type: 'SET_LOADING' })
  
  return <GithubContext.Provider value={{
    user: state.user,
    users: state.users,
    repos: state.repos,
    loading: state.loading,
    getUserRepos,
    searchUsers,
    getUser,
    clearUsers
  }}>
    { children }
  </GithubContext.Provider>
}

export default GithubContext;