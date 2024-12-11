const api_url = process.env.NEXT_PUBLIC_API_URL

const get = async (path) => {
  const response = await fetch(`${api_url}${path}`, {
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
    }
  })
  return await response.json()
}

const post = async (path, body) => {
  const response = await fetch(`${api_url}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  return await response.json()
}

export { get, post }