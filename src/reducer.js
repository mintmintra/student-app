const initiaState = {
    students: [
        { id: '1', name: 'Jeeeawuth', score: 99 },
        { id: '2', name: 'Sombat', score: 89 },
        { id: '3', name: 'Worrawan', score: 73 }
    ]
}

const reducer = (state = initiaState, action) => {
    const allStudents = [...state.students];
    switch (action.type) {
        case 'DEL_STUDENT':
            const newState = {
                ...state,
                students: state.students.filter(item => item.id !== action.payload)
            }
            return newState;
        case 'ADD_STUDENT':
            const addedState = {
                ...state,
                students: [action.payload, ...state.students]
            }
            return addedState;
        case 'EDIT_STUDENT':
            const indexForEdit = allStudents.findIndex((item) => {
                return item.id === action.payload.id;
            });
            allStudents[indexForEdit] = {
                id: action.payload.id,
                name: action.payload.name,
                score: action.payload.score
            }
            const editedState = {
                ...state,
                students: allStudents
            }
            return editedState;
        default:
            break;
    }
    return state;
}
export default reducer;