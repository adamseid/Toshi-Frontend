

export const updateGraph = (data, state, default_state) => {
    console.log('modules -> UpdateState.updateGraph(): STARTED')
    state.top_performer.graph = data['filtered_transactions'][0]
    state.top_performer.difference = data['filtered_transactions'][1]
    console.log('modules -> UpdateState.updateGraph(): FINISHED')
    return state
}



export const updateDailyTrendingPerformers = (data, state, default_state) => {
    console.log('modules -> UpdateState.updateGraph(): STARTED')
    state.trending_performers.data = data['filtered_transactions']
    console.log('modules -> UpdateState.updateGraph(): FINISHED')
    return state
}

export const updateDailyTopPerformers = (data, state, default_state) => {
    console.log('modules -> UpdateState.updateDailyTopPerformers(): STARTED')
    state.daily_top_performers.data = data['filtered_transactions']
    console.log('modules -> UpdateState.updateDailyTopPerformers(): FINISHED')

    return state
}