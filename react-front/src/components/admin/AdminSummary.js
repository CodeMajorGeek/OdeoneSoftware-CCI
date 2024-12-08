import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTrash,
  faPen,
  faPlus,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons"

import "./styles/AdminSummary.css"

export default function AdminSummary({ summaries, onDelete, onModify, onInsert }) {
  const renderSummaryList = (items, parentIndex = -1) => (
    <ul>
      {items.map((item, index) => (
        <li key={`${parentIndex}-${index}`}>
          <div className="summary-item">
            <span>{item.functionName}</span>
            <div className="summary-actions">
              <button
                className="action-btn delete"
                onClick={() => onDelete(parentIndex, index)}
                title="Supprimer"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button
                className="action-btn modify"
                onClick={() => onModify(parentIndex, index)}
                title="Modifier"
              >
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button
                className="action-btn insert-sub"
                onClick={() => onInsert(parentIndex, index, "sub")}
                title="Insérer en sous-liste"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button
                className="action-btn insert-down"
                onClick={() => onInsert(parentIndex, index, "down")}
                title="Insérer en dessous"
              >
                <FontAwesomeIcon icon={faArrowDown} />
              </button>
            </div>
          </div>
          {item.subContent && renderSummaryList(item.subContent, index)}
        </li>
      ))}
    </ul>
  )

  return <div className="summary-index">{renderSummaryList(summaries)}</div>
}
