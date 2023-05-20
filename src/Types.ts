
type FieldsErrorType = {
    error: string
    field:string
}

export type GeneralResponseType<D={}> = {
    resultCode: number
    messages: string[],
    fieldsErrors: FieldsErrorType[]
    data: D
}

export type ErrorResponseDataAPI = {
    //то что сюда класть переписываем из документации бэка
    //этот обьект формирует бэк и кладет его в респонс ошибки
    message:string
}


export type FilterType = 'all' | 'completed' | 'active';

export type IncompleteListAPIType = {
    addedDate: string
    id: string
    order: number
    title: string
}

export type OneToDoListAPIType = IncompleteListAPIType & {
    filter: FilterType
    listIsLoading: boolean
}


export type AllTasksType = {
    [key: string]: OneTaskType[] //ключ это айди туду листа
}



//тип перечисления, задаем какой либо статус в цифрах(значения)
// и описываем его именем свойства, что бы было понятно как с ним работать
//оказалось что енум это функция, больше без енума, прост неперезаписуемый боьект
export enum CheckStatus {
    New,
    InProgress,
    Completed,
    Draft //черновик

}

export enum PrioritiesForTask {
    Low,
    Middle,
    High,
    Urgently,
    Later
}

export const ResulAPICode = {
    Ok:0,
    Error:1,
    Captcha: 10,
} as const



export type FilterButtonDataType = {
    id: string
    title: FilterType
}




export type ResponseTasksType = {
    error: null | string
    items: IncompleteOneTaskAPIType[]
    totalCount: number
}


export type IncompleteOneTaskAPIType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: CheckStatus
    priority: PrioritiesForTask
    startDate: string
    deadline: string
    addedDate: string
}

export type OneTaskType = IncompleteOneTaskAPIType & {
    taskIsLoading: boolean
}