import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { HOME_URL, NOTE_URL } from "@/constants/UrlConstants";
import App from "@/components/App";
import Note from "@/components/notes/Note";
import NotFound from "../components/NotFound";

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={HOME_URL} element={<App />} errorElement={<NotFound />} />
      <Route path={`${NOTE_URL}/:noteId`} element={<Note />} errorElement={<NotFound />}/>
    </>
  )
);
