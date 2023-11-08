import React, { useReducer } from 'react';
import { base_pruebas } from '../../data_sinacofi/bbdd';
import { PJuridicas } from '@/application';
// Define the shape of your state and action if necessary
type DeclaracionesState = PJuridicas[]; // Assuming base_pruebas is defined elsewhere
type DeclaracionesAction = { type: 'ADD'; payload: any } |
{ type: 'REMOVE'; payload: any } |
{ type: 'SORT_BY_FOLIO'; payload: any } |
{ type: 'FILTER_BY_FOLIO'; payload: any } |
{ type: 'FILTER_BY_PERSONA_JURIDICA'; payload: any } |
{ type: 'FILTER_BY_BENEFICIARIO_OR_CONTROL'; payload: any } |
{ type: 'RESET'; }

// Define the reducer function
export const declaracionesReducer = (state: any, action: any) => {
    switch (action.type) {
        case "INIT":
            return {
                ...state,
                declaraciones: action.payload
            }
        case "FILTER_BY_FOLIO":
            return {
                ...state,
                declaraciones: state.declaraciones.filter((item: PJuridicas) => item.correlativo_declaracion === action.payload)
            };
        case "FILTER_BY_PERSONA_JURIDICA":
            return {
                ...state,
                declaraciones: state.declaraciones.filter((item: PJuridicas) => item.rut_no === action.payload)
            };
        case "SORT_BY_FECHA_CREACION":
            return {
                ...state,
                declaraciones: action.payload
            };
        case "SORT_BY_FECHA_CARGA":
            return {
                ...state,
                declaraciones: action.payload
            };
        case "RESET":
            return state;
        default:
            return state;
    }
};

export const declaracionesReducer1 = (state: DeclaracionesState, action: any): PJuridicas[] => {
    switch (action.type) {
        case 'INIT_DATA':
            return state;
        case 'RESET':
            return state;
        case 'ADD':
            // Implement the logic for adding an item
            return [...state, action.payload];
        case 'REMOVE':
            // Implement the logic for removing an item
            return state.filter(item => item !== action.payload);
        case 'FILTER_BY_FOLIO':
            return state.filter(item => item.correlativo_declaracion === action.payload);
        case 'FILTER_BY_PERSONA_JURIDICA':
            return state.filter(item => item.rut_no === action.payload);
        default:
            return state;
    }
};