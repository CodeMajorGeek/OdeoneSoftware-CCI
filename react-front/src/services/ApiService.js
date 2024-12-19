const API_BASE = "/api/v1"

async function apiAuthenticatedFetch(route, verb, data = null) {
    const accessToken = localStorage.getItem("acessToken")

    if (!accessToken)
        return

    let response = await fetch(route, {
        method: verb,
        headers: { 
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: data
    })

    if (response.status === 401) {
        const refreshToken = localStorage.getItem("refreshToken")
        const refreshResponse = await fetch("/api/v1/auth/refresh", {
            method: "POST",
            headers: { Authorization: `Bearer ${refreshToken}` }
        })

        if (refreshResponse.ok) {
            const rData = await refreshResponse.json()
            localStorage.setItem("accessToken", rData.accessToken)
            localStorage.setItem("refreshToken", rData.refreshToken)

            response = await fetch(route, {
                method: verb,
                headers: { Authorization: `Bearer ${rData.accessToken}` },
                body: data
            })
        } else
            throw new Error("Refresh token failed !")
    }

    return response
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

    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
}

export {
    apiLogin,
    apiRegister,
    apiLogout
}