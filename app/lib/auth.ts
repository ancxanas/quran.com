import { NextResponse } from "next/server"

let accessToken: string | null = null
let tokenExpiry: number = 0

async function fetchNewAccessToken(): Promise<string | null | undefined> {
  const clientId = process.env.QURAN_CLIENT_ID
  const clientSecret = process.env.QURAN_CLIENT_SECRET
  const oauthUrl = process.env.QURAN_OAUTH_URL

  console.table({ clientId, clientSecret, oauthUrl })

  if (!clientId || !clientSecret || !oauthUrl) {
    throw new Error("Missing Quran Foundation authentication credentials")
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

  try {
    const response = await fetch(oauthUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials&scope=content",
      next: { revalidate: 0 },
    })

    if (!response.ok) {
      throw new Error(`OAuth2 error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    accessToken = data.access_token
    tokenExpiry = Date.now() + data.expires_in * 1000 - 30000

    return accessToken
  } catch (error) {
    console.error(`Failed to get access token: ${error}`)
    throw new Error(`Authentication Failed`)
  }
}

export async function getAccessToken(): Promise<string | null | undefined> {
  if (accessToken && Date.now() < tokenExpiry) {
    console.log("expired", tokenExpiry)
    return accessToken
  }

  return fetchNewAccessToken()
}

export async function withAuth(headers: HeadersInit = {}): Promise<HeadersInit> {
  const token = await getAccessToken()
  const clientId = process.env.QURAN_CLIENT_ID

  if (!clientId) {
    throw new Error("Missing client ID")
  }

  return {
    ...headers,
    "x-auth-token": token,
    "x-client-id": clientId,
    Accept: "application/json",
    "Content-Type": "application/json",
  }
}
