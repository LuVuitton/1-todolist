import {RootStateType} from "../../redux/store";
//с хабра    https://habr.com/ru/articles/564004/
//Если в нескольких местах нужно получить одни и те же данные - код начинает дублироваться, его становится тяжело поддерживать.
//
// При каждом рендере - новая функция.
// И нет, это не относится к секте "плодить функции в компоненте плохо".
// Просто селектор будет вызываться при каждом рендере, а не только когда обновились данные в сторе.
// Вот эта логика в исходниках useSelector.
//
// Логика получения данных из структуры стора находится внутри компонента.
// Но зачем компоненту знать об этом?
export const selectLists = (state:RootStateType) => state.lists


export const selectListFilter = (listID:string)=> {
   return (state: RootStateType) => {
      const listIndex = state.lists.findIndex(e=> e.id === listID)
      return state.lists[listIndex].filter
   }
}

export const selectListTitle = (listID:string)=> {
   return (state: RootStateType) => {
      const listIndex = state.lists.findIndex(e=> e.id === listID)
      return state.lists[listIndex].title
   }
}
