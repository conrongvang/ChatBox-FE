export interface IStatePersonal {
    isToggle: boolean;
}

enum actiontypePersonal {
    ISTOGGLE = "istoggle"
}

interface IactionPersonal {
    type: actiontypePersonal;
    payload: boolean;
}

export const actionPersonal = (isToggle: boolean): IactionPersonal => ({
    type: actiontypePersonal.ISTOGGLE,
    payload: isToggle
});

export const initialStatePersonal = { isToggle: false };

export const personalReducer = (state = initialStatePersonal, action: IactionPersonal): IStatePersonal => {
    switch (action.type) {
        case actiontypePersonal.ISTOGGLE:
            return {
                ...state,
                isToggle: action.payload
            };
        default:
            return state
    }
}