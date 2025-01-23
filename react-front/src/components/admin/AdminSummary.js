import React, { useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTrash,
  faPen,
  faPlus,
  faFile,
  faCheck,
  faTimes
} from "@fortawesome/free-solid-svg-icons"

import "./styles/AdminSummary.css"

export default function AdminSummary({ summaries, setSummaries, onDelete, onModify, onInsert }) {
  const [newSummaryName, setNewSummaryName] = useState("")
  const [newSummarySubName, setNewSummarySubName] = useState("")
  const [newSummaryFile, setNewSummaryFile] = useState(null)
  const [editingItem, setEditingItem] = useState(null)
  const [editingText, setEditingText] = useState("")
  const [editingFile, setEditingFile] = useState(null)
  const [insertingSubItem, setInsertingSubItem] = useState(null)
  const [newSubName, setNewSubName] = useState("")
  const [newSubFile, setNewSubFile] = useState(null)

  const handleStartEdit = (item, parentIndex, index) => {
    setEditingItem({ parentIndex, index })
    setEditingText(item.functionName)
    setEditingFile(null)
  }

  const handleSaveEdit = () => {
    if (editingText.trim()) {
      onModify(editingItem.parentIndex, editingItem.index, editingText, editingFile)
      setEditingItem(null)
      setEditingText("")
      setEditingFile(null)
    }
  }

  const handleFileChange = (e, isEditing = false, isSubInsert = false) => {
    const file = e.target.files[0]
    if (file) {
      const fileType = file.type
      if (fileType === "video/mp4" || fileType === "image/png") {
        if (isSubInsert) {
          setNewSubFile(file)
        } else if (isEditing) {
          setEditingFile(file)
        } else {
          setNewSummaryFile(file)
        }
      } else {
        alert("Seuls les fichiers .mp4 et .png sont acceptés")
        e.target.value = null
      }
    }
  }

  const handleCreateSub = () => {
    if (newSubName.trim()) {
      onInsert(-1, insertingSubItem.index, "sub", {
        name: newSubName,
        file: newSubFile
      })
      setInsertingSubItem(null)
      setNewSubName("")
      setNewSubFile(null)
    }
  }

  const renderSummaryList = (items, parentIndex = -1) => (
    <ul>
      {items.map((item, index) => (
        <li key={`${parentIndex}-${index}`}>
          {editingItem?.parentIndex === parentIndex && editingItem?.index === index ? (
            <div className="edit-form">
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                placeholder="Nom du sommaire"
              />
              {parentIndex !== -1 && (
                <div className="file-input-container">
                  <input
                    type="file"
                    id={`edit-file-${parentIndex}-${index}`}
                    accept=".mp4,.png"
                    onChange={(e) => handleFileChange(e, true)}
                    className="file-input"
                  />
                  <label htmlFor={`edit-file-${parentIndex}-${index}`} className="file-label">
                    <FontAwesomeIcon icon={faFile} />
                    {editingFile ? editingFile.name : "Choisir un fichier (.mp4 ou .png)"}
                  </label>
                </div>
              )}
              <div className="edit-actions">
                <button className="action-btn save" onClick={handleSaveEdit}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button className="action-btn cancel" onClick={() => setEditingItem(null)}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
          ) : insertingSubItem?.index === index && parentIndex === -1 ? (
            <div className="insert-sub-form">
              <input
                type="text"
                value={newSubName}
                onChange={(e) => setNewSubName(e.target.value)}
                placeholder="Nom de la sous-partie"
              />
              <div className="file-input-container">
                <input
                  type="file"
                  id={`sub-file-${index}`}
                  accept=".mp4,.png"
                  onChange={(e) => handleFileChange(e, false, true)}
                  className="file-input"
                />
                <label htmlFor={`sub-file-${index}`} className="file-label">
                  <FontAwesomeIcon icon={faFile} />
                  {newSubFile ? newSubFile.name : "Choisir un fichier (.mp4 ou .png)"}
                </label>
              </div>
              <div className="edit-actions">
                <button 
                  className="action-btn save" 
                  onClick={handleCreateSub}
                  disabled={!newSubName.trim()}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button 
                  className="action-btn cancel" 
                  onClick={() => {
                    setInsertingSubItem(null)
                    setNewSubName("")
                    setNewSubFile(null)
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
          ) : (
            <div className="summary-item">
              <span>{item.functionName}</span>
              <div className="summary-actions">
                <button
                  className="action-btn delete"
                  onClick={async () => {
                    try {
                      await onDelete(parentIndex, index)
                    } catch (error) {
                      console.error("Erreur lors de la suppression:", error)
                    }
                  }}
                  title="Supprimer"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button
                  className="action-btn modify"
                  onClick={() => handleStartEdit(item, parentIndex, index)}
                  title="Modifier"
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
                {parentIndex === -1 && (
                  <button
                    className="action-btn insert-sub"
                    onClick={() => setInsertingSubItem({ index })}
                    title="Insérer une sous-partie"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                )}
              </div>
            </div>
          )}
          {item.subContent && renderSummaryList(item.subContent, index)}
        </li>
      ))}
    </ul>
  )

  const handleCreateSummary = () => {
    if (newSummaryName.trim() && newSummarySubName.trim() && newSummaryFile) {
      onInsert(-1, -1, "new", {
        parentName: newSummaryName,
        subName: newSummarySubName,
        file: newSummaryFile
      })
      setNewSummaryName("")
      setNewSummarySubName("")
      setNewSummaryFile(null)
    }
  }

  return (
    <div className="summary-index">
      {renderSummaryList(summaries)}
      <div className="summary-create">
        <h2>Créer un nouveau sommaire</h2>
        <input
          type="text"
          value={newSummaryName}
          onChange={(e) => setNewSummaryName(e.target.value)}
          placeholder="Nom du sommaire parent"
        />
        <input
          type="text"
          value={newSummarySubName}
          onChange={(e) => setNewSummarySubName(e.target.value)}
          placeholder="Nom de la première sous-partie"
        />
        <div className="file-input-container">
          <input
            type="file"
            id="summary-file"
            accept=".mp4,.png"
            onChange={(e) => handleFileChange(e)}
            className="file-input"
          />
          <label htmlFor="summary-file" className="file-label">
            <FontAwesomeIcon icon={faFile} />
            {newSummaryFile 
              ? newSummaryFile.name 
              : "Choisir un fichier pour la sous-partie (.mp4 ou .png)"}
          </label>
        </div>
        <button 
          className="create-btn" 
          onClick={handleCreateSummary}
          disabled={!newSummaryName.trim() || !newSummarySubName.trim() || !newSummaryFile}
        >
          <FontAwesomeIcon icon={faPlus} />
          Créer un sommaire
        </button>
      </div>
    </div>
  )
}
