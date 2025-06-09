// //import {Routes, Route} from 'react-router-dom';
// import Home from './Pages/Home';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   return (
//     <div className="App">
//       <Home />

//     </div>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Settings from "./Pages/Settings";
import ProfileSettings from "./Pages/ProfileSettings";
import NotificationPreferences from "./Pages/Notifications";
import Privacy from "./Pages/Privacy";
import Security from "./Pages/Security";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/notifications" element={<NotificationPreferences />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/security" element={<Security />} />
      </Routes>
    </Router>
  );
}

export default App;
