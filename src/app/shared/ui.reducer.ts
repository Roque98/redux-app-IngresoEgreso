import * as fromUI from './ui.accions';

export interface State {
    isLoading: boolean;
}

const iniitState: State = {
    isLoading: false
};

export function uiReducer( state = iniitState, action: fromUI.acciones): State {
    switch ( action.type ) {
        case fromUI.ACTIVAR_LOADING:
            return {
                isLoading: true
            };

        case fromUI.DESACTIVAR_LOADING:
            return {
                isLoading: false
            };

        default:
            return state;
    }
}

