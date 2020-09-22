export default function useAuth() {
  return JSON.parse(sessionStorage.getItem('auth'));
}
