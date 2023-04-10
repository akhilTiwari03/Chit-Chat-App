import "./App.css";
import { Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import ChatsPage from "./Pages/ChatsPage";


function App() {
  return (
     <div className="App">
      <Route path="/" component={Homepage} exact/>
      <Route path="/chats" component={ChatsPage}/>
     </div>
  );
}

export default App;
