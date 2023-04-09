import { Route, Routes } from "react-router-dom"
import Customtheme from "./custom-theme"

const OnlineStore = () => {
  return (
    <Routes>
      <Route path="/" element={<Customtheme />} />
    </Routes>
  )
}

export default OnlineStore
