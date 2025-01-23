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

    return await response.json()
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
        console.log(data)
    } else
        throw new Error("Login failed !")
}

async function apiLogout() {
    const accessToken = localStorage.getItem("accessToken")

    await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            refreshToken: localStorage.getItem("refreshToken")
        })
    })

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

    if (response.ok)
        return await response.json()
    return null
}

async function apiCreateFaq(faq) {
    const response = await apiAuthenticatedFetch(
        `/faq`,
        "POST",
        faq
    )

    return response
}

async function apiEditFaq(faq) {
    return await apiAuthenticatedFetch(
        `/faq/${faq.id}`,
        "PUT",
        {
            question: faq.question,
            answer: faq.answer
        }
    );
}

async function apiRemoveFaq(faq) {
    return await apiAuthenticatedFetch(
        `/faq/${faq.id}`,
        "DELETE"
    )
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

async function apiGetUser() {
    return await apiAuthenticatedFetch(`/users/me`, "GET")
}

async function apiUpdateUser(user) {
    return await apiAuthenticatedFetch(`/users/me`, "PUT", user)
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
    apiGetUser,
    apiUpdateUser
}