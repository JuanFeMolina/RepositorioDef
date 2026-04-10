export async function obtenerUsuarios(url) {
    const respuesta = await fetch(url)
    const datosOriginales = await respuesta.json()
    
    return datosOriginales.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name
    }))
}