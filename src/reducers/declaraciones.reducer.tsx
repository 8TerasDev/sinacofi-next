import React, { useReducer } from 'react';
import { base_pruebas } from '../../data_sinacofi/bbdd';
// Define the shape of your state and action if necessary
type DeclaracionesState = typeof base_pruebas; // Assuming base_pruebas is defined elsewhere
type DeclaracionesAction = { type: 'ADD'; payload: any } |
{ type: 'REMOVE'; payload: any } |
{ type: 'FILTER_BY_FOLIO'; payload: any } |
{ type: 'FILTER_BY_PERSONA_JURIDICA'; payload: any } |
{ type: 'FILTER_BY_BENEFICIARIO_OR_CONTROL'; payload: any } |
{ type: 'RESET'; }

// Define the reducer function
export const declaracionesReducer = (state: DeclaracionesState, action: DeclaracionesAction): DeclaracionesState => {
    switch (action.type) {
        case 'RESET':
            return [...base_pruebas];
        case 'ADD':
            // Implement the logic for adding an item
            return [...state, action.payload];
        case 'REMOVE':
            // Implement the logic for removing an item
            return state.filter(item => item !== action.payload);
        case 'FILTER_BY_FOLIO':
            return state.filter(item => item.folio === action.payload);
        case 'FILTER_BY_PERSONA_JURIDICA':
            return state.filter(item => item.persona_juridica.rut === action.payload);
        case 'FILTER_BY_BENEFICIARIO_OR_CONTROL':
            return state.filter(item => item.beneficiarios_finales.some(beneficiario => beneficiario.rut_identificacion === action.payload));
        default:
            return state;
    }
};