export function setCookieInfinity(name: string, value: string) {
  const currentDate = new Date();
  const expirationDate = new Date(
    currentDate.getFullYear() + 50,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const expires = expirationDate.toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}
