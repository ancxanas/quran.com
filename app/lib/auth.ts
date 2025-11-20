import { unstable_cache } from "next/cache";

interface TokenData {
  accessToken: string;
  expiresAt: number;
}

async function fetchTokenFromApi(): Promise<TokenData> {
  const clientId = process.env.QURAN_CLIENT_ID;
  const clientSecret = process.env.QURAN_CLIENT_SECRET;
  const oauthUrl = process.env.QURAN_OAUTH_URL;

  if (!clientId || !clientSecret || !oauthUrl) {
    throw new Error("Missing Quran Foundation authentication credentials");
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const response = await fetch(oauthUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials&scope=content",
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`OAuth2 error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    const expiresAt = Date.now() + data.expires_in * 1000 - 300000;

    return { accessToken: data.access_token, expiresAt };
  } catch (error) {
    console.error("Failed to fetch fresh access token:", error);
    throw new Error(`Authentication Failed`);
  }
}

const getCachedToken = unstable_cache(async () => fetchTokenFromApi(), ["quran-auth-token"], {
  revalidate: 3600,
  tags: ["auth"],
});

export async function getAccessToken(): Promise<string | null> {
  try {
    const tokenData = await getCachedToken();
    if (Date.now() > tokenData.expiresAt) {
      console.log("Cached token expired, relying on background revalidation...");
    }

    return tokenData.accessToken;
  } catch (error) {
    return null;
  }
}

export async function withAuth(headers: HeadersInit = {}): Promise<HeadersInit> {
  const token = await getAccessToken();
  const clientId = process.env.QURAN_CLIENT_ID;

  if (!clientId) {
    throw new Error("Missing client ID");
  }

  if (!token) {
    console.warn("Warning: No auth token available");
  }

  return {
    ...headers,
    "x-auth-token": token ?? "",
    "x-client-id": clientId,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}
