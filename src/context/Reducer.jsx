import { ACTIONS } from "./types"
import evaluate from "./Actions"

export default function reducer(state, { type, payload }) {
    switch (type) {
      case ACTIONS.ADD_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            currentOperand: payload.digit,
            overwrite: false,
          }
        }
        if (payload.digit === "0" && state.currentOperand === "0") {
          return state
        }
        if (payload.digit === "." && state.currentOperand.includes(".")) {
          return state
        }
  
        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${payload.digit}`,
        }
      case ACTIONS.CHOOSE_OPERATION:
        if (state.currentOperand == null && state.previousOperand == null) {
          return state
        }
  
        if (state.currentOperand == null) {
          return {
            ...state,
            operation: payload.operation,
          }
        }
  
        if (state.previousOperand == null) {
          return {
            ...state,
            operation: payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: null,
          }
        }

        const result = evaluate(state)
  
        return {
          ...state,
          previousOperand: result,
          results: [...(state.results || []), 
          {
            result: result, 
            previousOperand: state.previousOperand,
            operation: state.operation,
            currentOperand: state.currentOperand

          }],
          operation: payload.operation,
          currentOperand: null,
        }
      case ACTIONS.CLEAR:
        return {user: state.user, results: [...(state.results|| [])]}
      case ACTIONS.DELETE_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            overwrite: false,
            currentOperand: null,
          }
        }
        if (state.currentOperand == null) return state
        if (state.currentOperand.length === 1) {
          return { ...state, currentOperand: null }
        }
  
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0, -1),
        }
      case ACTIONS.EVALUATE:
        if (
          state.operation == null ||
          state.currentOperand == null ||
          state.previousOperand == null
        ) {
          return state
        }

        const currRes = evaluate(state)

        return {
          ...state,
          results: [...(state.results || []), 
            {
              result: currRes, 
              previousOperand: state.previousOperand,
              operation: state.operation,
              currentOperand: state.currentOperand

            }],
          overwrite: true,
          previousOperand: null,
          operation: null,
          currentOperand: currRes,
        }
      case ACTIONS.COPY_RES:
        return {
          ...state,
          currentOperand: payload.currentOperand,
        }
      case ACTIONS.LOGIN:
          return {
            ...state,
            user: payload,
          }
      default:
        return {...state}
    }
  }