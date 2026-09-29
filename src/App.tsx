import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import LogIndex from "./pages/LogIndex";
import LogEntry from "./pages/LogEntry";
import NotFound from "./pages/NotFound";
import Roundtrip from "./pages/work/Roundtrip";
import MeleeMadness from "./pages/work/MeleeMadness";
import Qzone from "./pages/work/Qzone";
import TagPrototype from "./pages/work/TagPrototype";
import RoboticsChallenge from "./pages/work/RoboticsChallenge";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work/roundtrip" element={<Roundtrip />} />
        <Route path="work/melee-madness" element={<MeleeMadness />} />
        <Route path="work/qzone" element={<Qzone />} />
        <Route path="work/tag-prototype" element={<TagPrototype />} />
        <Route path="work/robotics-challenge" element={<RoboticsChallenge />} />
        <Route path="log" element={<LogIndex />} />
        <Route path="log/:slug" element={<LogEntry />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
