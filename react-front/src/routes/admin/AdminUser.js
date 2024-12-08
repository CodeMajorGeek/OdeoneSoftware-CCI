import React, { useState, useEffect } from "react"

import "./styles/AdminUser.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faEdit, faKey } from "@fortawesome/free-solid-svg-icons"

export default function AdminUser() {
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [search, setSearch] = useState("")
    const [editingUser, setEditingUser] = useState(null)

    useEffect(() => {
        fetch("http://localhost:8080/users")
            .then((response) => response.json())
            .then((data) => {
                setUsers(data)
                setFilteredUsers(data)
            })
            .catch((error) => console.error("Erreur lors du chargement des données :", error))
    }, [])

    useEffect(() => {
        const filtered = users.filter((user) =>
            user.companyName?.toLowerCase().includes(search.toLowerCase())
        )
        setFilteredUsers(filtered)
    }, [search, users])

    const handleEdit = (user) => {
        setEditingUser(user)
    }

    const handleSave = () => {
        fetch(`http://localhost:8080/users/${editingUser.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editingUser),
        })
            .then(() => {
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === editingUser.id ? editingUser : user
                    )
                )
                setEditingUser(null)
            })
            .catch((error) =>
                console.error("Erreur lors de la sauvegarde des données :", error)
            )
    }

    const handleResetPassword = (user) => {
        console.log(`Réinitialisation du mot de passe pour ${user.firstName} ${user.lastName}`)
    }

    return (
        <div className="admin-user">
            <h1>Gestion des utilisateurs</h1>
            <div className="search-bar">
                <FontAwesomeIcon icon={faSearch} />
                <input
                    type="text"
                    placeholder="Rechercher par nom de compagnie"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="user-list">
                {filteredUsers.map((user) => (
                    <div className="user-item" key={user.id}>
                        <div>
                            <strong>{user.firstName} {user.lastName}</strong> - {user.companyName}
                        </div>
                        <div className="actions">
                            <button onClick={() => handleEdit(user)}>
                                <FontAwesomeIcon icon={faEdit} /> Modifier
                            </button>
                            <button onClick={() => handleResetPassword(user)}>
                                <FontAwesomeIcon icon={faKey} /> Réinitialiser mot de passe
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {editingUser && (
                <div className="edit-form">
                    <h2>Modifier l'utilisateur</h2>
                    <form>
                        <label>Prénom :</label>
                        <input
                            type="text"
                            value={editingUser.firstName}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, firstName: e.target.value })
                            }
                        />
                        <label>Nom :</label>
                        <input
                            type="text"
                            value={editingUser.lastName}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, lastName: e.target.value })
                            }
                        />
                        <label>Mail principal :</label>
                        <input
                            type="email"
                            value={editingUser.primaryEmail}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, primaryEmail: e.target.value })
                            }
                        />
                        <label>Mail secondaire :</label>
                        <input
                            type="email"
                            value={editingUser.secondaryEmail}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, secondaryEmail: e.target.value })
                            }
                        />
                        <label>Nom de compagnie :</label>
                        <input
                            type="text"
                            value={editingUser.companyName}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, companyName: e.target.value })
                            }
                        />
                        <label>Numéro de téléphone :</label>
                        <input
                            type="tel"
                            value={editingUser.phone}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, phone: e.target.value })
                            }
                        />
                        <label>Civilité :</label>
                        <select
                            value={editingUser.civility}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, civility: e.target.value })
                            }
                        >
                            <option value="not-specified">Non spécifé</option>
                            <option value="M">Monsieur</option>
                            <option value="Mme">Madame</option>
                        </select>
                        <div className="form-actions">
                            <button type="button" onClick={handleSave}>
                                Enregistrer
                            </button>
                            <button type="button" onClick={() => setEditingUser(null)}>
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}
