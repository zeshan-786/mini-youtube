import "./App.css";
import Videos from "./Components/Video/Videos";
import VideoUplaod from "./Components/Video/VideoUpload";
import Menubar from "./Components/Menubar/Menubar";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import StickyFooter from "./Components/UI/Footer/Footer";
import BackButton from "./Components/UI/BackButton/BackButton";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Menubar />
        <Switch>
          <Route exact path="/videos" component={Videos} />
          <Route path="/upload-video" component={VideoUplaod} />
          <Route path="/" component={Videos} />
          <Redirect to="/" />
        </Switch>
        <BackButton />
        <StickyFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
