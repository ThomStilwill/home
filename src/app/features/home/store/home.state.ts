import { ProgressState } from "./progress/progress.state";
import { LinkState } from "./link/link.state";
import { GoogleState } from "./google/google.state";


export interface HomeState {
  progress: ProgressState;
  link: LinkState;
  google: GoogleState;
}
