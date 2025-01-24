const API_BASE = "/api/v1"

async function apiAuthenticatedFetch(route, verb, data = null) {
    const accessToken = localStorage.getItem("accessToken")

    if (!accessToken)
        return null

    const options = {
        method: verb,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    }

    if (data) {
        options.body = JSON.stringify(data)
    }

    let response = await fetch(`${API_BASE}${route}`, options)

    if (response.status === 401) {
        const refreshToken = localStorage.getItem("refreshToken")
        const refreshResponse = await fetch(`${API_BASE}/auth/refresh`, {
            method: "POST",
            headers: { Authorization: `Bearer ${refreshToken}` }
        })

        if (refreshResponse.ok) {
            const rData = await refreshResponse.json()
            console.log("Refresh token response:", rData)
            localStorage.setItem("accessToken", rData.accessToken)
            localStorage.setItem("refreshToken", rData.refreshToken)

            options.headers.Authorization = `Bearer ${rData.accessToken}`
            response = await fetch(`${API_BASE}${route}`, options)
        } else {
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
            throw new Error("Session expirée")
        }
    }

    if (!response.ok) {
        throw new Error("Erreur lors de la requête")
    }

    const jsonResponse = await response.json()
    console.log(`API Response for ${route}:`, jsonResponse)
    return jsonResponse
}

async function apiLogin(mail, pass) {
    const response = await fetch(`${API_BASE}/auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: mail,
            password: pass
        })
    })

    if (response.ok) {
        const data = await response.json()
        console.log("Login response:", data)

        localStorage.setItem("accessToken", data.accessToken)
        localStorage.setItem("refreshToken", data.refreshToken)
    } else
        throw new Error("Login failed !")
}

async function apiRegister(fName, lName, mEmail, sEmail, comp, tel, pass, gend) {
    const response = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            lastname: lName,
            firstname: fName,
            main_email: mEmail,
            second_email: sEmail,
            company: comp,
            telephone: tel,
            password: pass,
            gender: gend
        })
    })

    if (response.ok) {
        const data = await response.json()
        console.log("Register response:", data)
    } else
        throw new Error("Login failed !")
}

async function apiLogout() {
    const accessToken = localStorage.getItem("accessToken")

    const response = await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            refreshToken: localStorage.getItem("refreshToken")
        })
    })

    console.log("Logout response:", await response.json())

    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
}

async function apiGetFaqs(searchWords) {
    let endpoint = `${API_BASE}/faq`
    if (searchWords) {
        endpoint += `?search=${encodeURIComponent(searchWords)}`
    }

    const response = await fetch(endpoint, {
        method: "GET"
    })

    if (response.ok) {
        const data = await response.json()
        console.log("Get FAQs response:", data)
        return data
    }
    return null
}

async function apiCreateFaq(faq) {
    const response = await apiAuthenticatedFetch(
        `/faq`,
        "POST",
        faq
    )
    console.log("Create FAQ response:", response)
    return response
}

async function apiEditFaq(faq) {
    const response = await apiAuthenticatedFetch(
        `/faq/${faq.id}`,
        "PUT",
        {
            question: faq.question,
            answer: faq.answer
        }
    );
    console.log("Edit FAQ response:", response)
    return response
}

async function apiRemoveFaq(faq) {
    const response = await apiAuthenticatedFetch(
        `/faq/${faq.id}`,
        "DELETE"
    )
    console.log("Remove FAQ response:", response)
    return response
}

async function apiValidateToken(dispatch) {
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")

    if (!accessToken || !refreshToken) {
        return false
    }

    try {
        // Vérifie si le access token est valide
        const response = await fetch(`${API_BASE}/auth/validate`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })

        if (response.ok) {
            const validationData = await response.json()
            console.log("Token validation response:", validationData)
            const decodedToken = JSON.parse(atob(accessToken.split('.')[1]))
            dispatch({ type: "setAuthenticatedMode", payload: { mode: true, admin: decodedToken.admin }})
            return true
        }

        // Si non valide, essaie de refresh
        const refreshResponse = await fetch(`${API_BASE}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ refreshToken })
        })

        if (refreshResponse.ok) {
            const data = await refreshResponse.json()
            console.log("Token refresh response:", data)
            localStorage.setItem("accessToken", data.accessToken)
            const decodedToken = JSON.parse(atob(data.accessToken.split('.')[1]))
            dispatch({ type: "setAuthenticatedMode", payload: { mode: true, admin: decodedToken.admin }})
            return true
        }

        // Si refresh échoue, nettoie le storage
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        dispatch({ type: "resetAuthentification" })
        return false

    } catch (error) {
        console.error("Erreur de validation du token:", error)
        localStorage.removeItem("accessToken") 
        localStorage.removeItem("refreshToken")
        dispatch({ type: "resetAuthentification" })
        return false
    }
}

async function apiGetFunctions() {
    const response = await fetch(`${API_BASE}/function`, {
        method: "GET"
    });

    if (response.ok) {
        const data = await response.json()
        console.log("Get functions response:", data)
        return data
    }
    return null;
}

async function apiCreateFunction(func) {
    const response = await apiAuthenticatedFetch(
        `/function`,
        "POST",
        {
            title: func.title,
            features: func.features
        }
    );
    console.log("Create function response:", response)
    return response
}

async function apiEditFunction(func) {
    const response = await apiAuthenticatedFetch(
        `/function/${func.id}`,
        "PUT",
        {
            title: func.title,
            features: func.features
        }
    );
    console.log("Edit function response:", response)
    return response
}

async function apiRemoveFunction(func) {
    const response = await apiAuthenticatedFetch(
        `/function/${func.id}`,
        "DELETE"
    );
    console.log("Remove function response:", response)
    return response
}

async function apiGetUser() {
    const response = await apiAuthenticatedFetch(`/users/me`, "GET")
    console.log("Get user response:", response)
    return response
}

async function apiUpdateUser(user) {
    const response = await apiAuthenticatedFetch(`/users/me`, "PUT", user)
    console.log("Update user response:", response)
    return response
}

async function apiGetAllUsers() {
    const response = await apiAuthenticatedFetch(`/users`, "GET")
    console.log("Get all users response:", response)
    return response
}

async function apiSearchUsersByCompany(company) {
    const response = await apiAuthenticatedFetch(`/users/${company}`, "GET")
    console.log("Search users by company response:", response)
    return response
}

async function apiUpdateUserById(id, user) {
    const response = await apiAuthenticatedFetch(`/users/id/${id}`, "PUT", user)
    console.log("Update user by ID response:", response)
    return response
}

async function apiGetAllSummaries() {
    const response = await apiAuthenticatedFetch(`/summaries`, "GET")
    console.log("Get all summaries response:", response)
    return response
}

async function apiCreateSummary(summaryData) {
    const formData = new FormData()
    
    if (summaryData.parentName) {
        formData.append('parentName', summaryData.parentName)
        formData.append('subName', summaryData.subName)
    } else {
        formData.append('functionName', summaryData.functionName)
        formData.append('parentId', summaryData.parentId)
    }
    
    if (summaryData.file) {
        formData.append('file', summaryData.file)
    }

    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formData
    }

    const response = await fetch(`${API_BASE}/summaries`, options)
    if (!response.ok) throw new Error("Erreur lors de la création du sommaire")
    const data = await response.json()
    console.log("Create summary response:", data)
    return data
}

async function apiUpdateSummary(id, summaryData) {
    const formData = new FormData()
    formData.append('functionName', summaryData.functionName)
    if (summaryData.file) {
        formData.append('file', summaryData.file)
    }
    
    const options = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formData
    }

    const response = await fetch(`${API_BASE}/summaries/${id}`, options)
    if (!response.ok) throw new Error("Erreur lors de la modification du sommaire")
    const data = await response.json()
    console.log("Update summary response:", data)
    return data
}

async function apiDeleteSummary(id) {
    const response = await apiAuthenticatedFetch(`/summaries/${id}`, "DELETE")
    console.log("Delete summary response:", response)
    return response
}

export {
    apiLogin,
    apiRegister,
    apiLogout,
    apiGetFaqs,
    apiCreateFaq,
    apiEditFaq,
    apiRemoveFaq,
    apiValidateToken,
    apiGetFunctions,
    apiCreateFunction,
    apiEditFunction,
    apiRemoveFunction,
    apiGetUser,
    apiUpdateUser,
    apiGetAllUsers,
    apiSearchUsersByCompany,
    apiUpdateUserById,
    apiGetAllSummaries,
    apiCreateSummary,
    apiUpdateSummary,
    apiDeleteSummary
}