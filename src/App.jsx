import { useState ,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import './App.css'
import authService from './appwrite/Auth'
import {login,logout} from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import Loaderv from './components/Loaderv'
function App() {
  const stat = useSelector(state => state.auth.status);
  console.log(stat)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .catch(()=>{
      console.log('please login')
    })
    .finally(() => setLoading(false))
  }, [stat])
  

  return !loading ? (

    <div className='min-h-screen flex flex-wrap content-between bg-white'>
      <div className='w-full block'>
        <Header />
        <main>
          {/* <div>{
            
            stat ? <div>You are logined </div>: <div>You are logout </div>
           
          } this</div> */}
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : <Loaderv/>
}

export default App
