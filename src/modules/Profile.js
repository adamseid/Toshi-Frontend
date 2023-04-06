import { updateGraph, updateTable } from "./profile/UpdateState"


export const updateState = (data, state, default_state) => {
    console.log('modules -> Profile.updateState(): STARTED')

    console.log(JSON.stringify(data))
    if (data['response'] === 'update-graph') {
        // console.log('update-graph')
        state = updateGraph(data, state, default_state)
    }

    if (data['response'] === 'update-table') {
        // console.log('update-graph')
        state = updateTable(data, state, default_state)
    }

    

    console.log('modules -> Profile.updateState(): FINISHED')
    return state

}





