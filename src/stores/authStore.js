const AUTH_STORAGE_KEY = "imc-auth-session";

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

export function getStoredAuth() {
  if (!canUseStorage()) {
    return { user: null };
  }

  const storedValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedValue) {
    return { user: null };
  }

  try {
    return JSON.parse(storedValue);
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return { user: null };
  }
}

export function saveStoredAuth(user) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user }));
}

export function clearStoredAuth() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export { AUTH_STORAGE_KEY };
