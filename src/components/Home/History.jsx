import React from "react";
import { ACTIONS } from "../../context/types";

function History({ dispatch, results }) {
  return (
    <div className="history-container">
      <div className="history-item">Results:</div>
      <div></div>
      {results
        ?.slice(0)
        ?.reverse()
        ?.map((ele) => (
          <div className="history-item">
            <svg 
                onClick={() => dispatch({ type: ACTIONS.COPY_RES, payload: { currentOperand: ele.result } })}
                title = "Copy to Clipboard" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M405.333 80h-87.35C310.879 52.396 285.821 32 256 32s-54.879 20.396-61.983 48h-87.35C83.198 80 64 99.198 64 122.667v314.665C64 460.801 83.198 480 106.667 480h298.666C428.802 480 448 460.801 448 437.332V122.667C448 99.198 428.802 80 405.333 80zM256 80c11.729 0 21.333 9.599 21.333 21.333s-9.604 21.334-21.333 21.334-21.333-9.6-21.333-21.334S244.271 80 256 80zm152 360H104V120h40v72h224v-72h40v320z"></path>
            </svg>
            {`${ele.result} = ${ele.previousOperand}${ele.operation}${ele.currentOperand}`}
          </div>
        ))}
    </div>
  );
}

export default History;