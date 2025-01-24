import React, { useState, useEffect } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faEdit, faKey, faTrash } from "@fortawesome/free-solid-svg-icons"

import { 
    apiGetAllUsers, 
    apiSearchUsersByCompany, 
    apiUpdateUserById,
    apiDeleteUser
} from "../../services/ApiService"

import "./styles/AdminUser.css"

export default function AdminUser() {
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [search, setSearch] = useState("")
    const [editingUser, setEditingUser] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await apiGetAllUsers()
                setUsers(data)
                setFilteredUsers(data)
            } catch (error) {
                console.error("Erreur lors du chargement des données :", error)
            }
        }
        fetchUsers()
    }, [])

    useEffect(() => {
        const searchUsers = async () => {
            try {
                if (search.trim()) {
                    const data = await apiSearchUsersByCompany(search)
                    setFilteredUsers(data)
                } else {
                    setFilteredUsers(users)
                }
            } catch (error) {
                console.error("Erreur lors de la recherche :", error)
            }
        }
        searchUsers()
    }, [search, users])

    const handleEdit = (user) => {
        console.log(user)
        const normalizedUser = {
            firstName: user.firstname || '',
            lastName: user.lastname || '',
            primaryEmail: user.main_email || '',
            secondaryEmail: user.secondary_email || '',
            companyName: user.company || '',
            phone: user.telephone|| '',
            civility: user.civility || 'not-specified',
            id: user.id_user
        }
        setEditingUser(normalizedUser)
    }

    const handleSave = async () => {
        try {
            const userToUpdate = {
                firstname: editingUser.firstName,
                lastname: editingUser.lastName,
                main_email: editingUser.primaryEmail,
                company: editingUser.companyName,
                telephone: editingUser.phone,
                civility: editingUser.civility
            }

            if (editingUser.secondaryEmail) {
                userToUpdate.secondary_email = editingUser.secondaryEmail
            }
            
            await apiUpdateUserById(editingUser.id, userToUpdate)
            
            // Rafraîchir la liste des utilisateurs
            const updatedUsers = await apiGetAllUsers()
            setUsers(updatedUsers)
            setFilteredUsers(updatedUsers)
            
            setEditingUser(null)
        } catch (error) {
            console.error("Erreur lors de la sauvegarde des données :", error)
        }
    }

    const handleResetPassword = (user) => {
        console.log(`Réinitialisation du mot de passe pour ${user.firstName} ${user.lastName}`)
    }

    const handleDelete = async (user) => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.firstname} ${user.lastname} ?`)) {
            try {
                await apiDeleteUser(user.id_user)
                const updatedUsers = await apiGetAllUsers()
                setUsers(updatedUsers)
                setFilteredUsers(updatedUsers)
            } catch (error) {
                console.error("Erreur lors de la suppression de l'utilisateur :", error)
            }
        }
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
                    <div className="user-item" key={user.id_user}>
                        <div>
                            <strong>{user.firstname} {user.lastname}</strong> - {user.company}
                        </div>
                        <div className="actions">
                            <button onClick={() => handleEdit(user)}>
                                <FontAwesomeIcon icon={faEdit} /> Modifier
                            </button>
                            <button onClick={() => handleResetPassword(user)}>
                                <FontAwesomeIcon icon={faKey} /> Réinitialiser mot de passe
                            </button>
                            <button onClick={() => handleDelete(user)} className="delete-btn">
                                <FontAwesomeIcon icon={faTrash} /> Supprimer
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
                            value={editingUser.firstName || ''}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, firstName: e.target.value })
                            }
                            autoComplete="given-name"
                        />
                        <label>Nom :</label>
                        <input
                            type="text"
                            value={editingUser.lastName || ''}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, lastName: e.target.value })
                            }
                            autoComplete="family-name"
                        />
                        <label>Mail principal :</label>
                        <input
                            type="email"
                            value={editingUser.primaryEmail || ''}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, primaryEmail: e.target.value })
                            }
                            autoComplete="email"
                        />
                        <label>Mail secondaire :</label>
                        <input
                            type="email"
                            value={editingUser.secondaryEmail || ''}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, secondaryEmail: e.target.value })
                            }
                            autoComplete="email"
                        />
                        <label>Nom de compagnie :</label>
                        <input
                            type="text"
                            value={editingUser.companyName || ''}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, companyName: e.target.value })
                            }
                            autoComplete="organization"
                        />
                        <label>Numéro de téléphone :</label>
                        <input
                            type="tel"
                            value={editingUser.phone || ''}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, phone: e.target.value })
                            }
                            autoComplete="tel"
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
