import { 
  GoogleState, 
  LinkState, 
  ProgressState, 
  MenuState 
} from ".";

export interface HomeState {
  progress: ProgressState;
  link: LinkState;
  google: GoogleState;
  menu: MenuState;
}
