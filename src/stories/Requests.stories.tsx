import axios from 'axios';
import React, {useEffect, useState} from 'react';

export default {
    title: 'API'
}

const settings = {
    withCredentials:true
}
export const GetLists = () => {
    const [state, setState] = useState<any>({man: 'Dimosn'})
    //
    // useEffect(()=> {
    //     axios.get('https://social-network.samuraijs.com/api/1.0/users')
    //         .then(r=>{console.log(r.data.items)})
    // })

    return <div>{JSON.stringify(state)} </div> //obj to string
}
