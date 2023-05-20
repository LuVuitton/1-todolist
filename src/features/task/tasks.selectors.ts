import {RootStateType} from "../../redux/store";
//просто вынесли колбэек из юз селектора сюда что бы рефакторить в одном месте а не на каждом селекторе

//в юзСелекторе вызываем функцию и она вернет    return (state:RootStateType)=> {}, а ее уже вызовет юзСелектор

export const selectAllTasks = (listID:string) => {
   return (state:RootStateType)=> {
      return state.tasks[listID]
    }
}
