import { atom } from "recoil";

export const currentMovieState = atom({
  key:"currentMovie",
  default:null
});

export const modalState = atom({
  key:"showModal",
  default:false
})