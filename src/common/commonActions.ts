export {}
import {createAction} from "@reduxjs/toolkit";

//например на случай того ели опять буут проблемы с порядком инициализации

// createAction нужен для того что бы создать экшены которые используются в разных редьюсерах,
// экш создается отдельно от какого либо слайса
// если заменять существующие экшены из редьюсера на эти, то не забыть удалить экшены их обычного и перенести
// в экстра редьюсеры как кейс(там они запускаются автоматом как только чувствуют диспачт))

// export const someAction = createAction<то что принимает>('./имя')