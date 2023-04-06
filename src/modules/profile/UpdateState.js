

export const updateGraph = (data, state, default_state) => {
    console.log('modules -> UpdateState.updateGraph(): STARTED')
    state.profile.graph = data
    console.log('modules -> UpdateState.updateGraph(): FINISHED')
    return state
}

export const updateTable = (data, state, default_state) => {
    console.log('modules -> UpdateState.updateGraph(): STARTED')
    state.profile.table = data
    console.log('modules -> UpdateState.updateGraph(): FINISHED')
    return state
}
