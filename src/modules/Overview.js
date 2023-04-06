import { updateDailyTopPerformers, updateGraph , updateDailyTrendingPerformers} from "./overview/UpdateState"

export const updateState = (data, state, default_state) => {
    console.log('modules -> Overview.updateState(): STARTED')

    console.log(data['response'])

    if (data['response'] === 'update-graph') {
        // console.log('update-graph')
        state = updateGraph(data, state, default_state)
    }
    
    if (data['response'] === 'update-daily-top-performers') {
        // console.log('update-daily-top-performers')
        // console.log(data)
        state = updateDailyTopPerformers(data, state, default_state)
    }

    if (data['response'] === 'update-trending-table') {
        state = updateDailyTrendingPerformers(data, state, default_state)
    }

    

    console.log('modules -> Overview.updateState(): FINISHED')
    return state

}





