import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { HOME_URL, NOTE_URL } from "@/constants/UrlConstants";
import App from "@/components/App";
import Note from "@/components/notes/Note";

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={HOME_URL} element={<App />} errorElement={<>404 Not found!</>} />
      <Route path={`${NOTE_URL}/:noteId`} element={<Note />}/>
    </>
  )
);
