import Header from "./component/Header/Header"
import Rate from "./component/Rate/Rate"
import History from "./component/History/History"
import Recommend from "./component/Recommend/Recommend"

import { store } from "./redux/store"

import { Provider } from "react-redux"
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";



const App = () => {


  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <Routes>
          
            <Route path="/" Component={Rate} />
            <Route path="/History" Component={History} />
            <Route path="/Recommend" Component={Recommend} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App;
