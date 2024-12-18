
const API_BASE = "/api/v1"

async function apiAuthenticatedFetch(route, verb, data = null) {
    const accessToken = localStorage.getItem("acessToken")

    if (!accessToken)
        return

    let response = await fetch(route, {
        method: verb,
        headers: { Authorization: `Bearer ${accessToken}` },
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
    console.log("Données : ", mail, pass)
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

        console.log(data.accessToken)

        localStorage.setItem("accessToken", data.accessToken)
        localStorage.setItem("refreshToken", data.refreshToken)
    } else
        throw new Error("Login failed !")
}

export {
    apiLogin
}