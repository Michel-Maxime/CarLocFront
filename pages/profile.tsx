import authService from "../services/auth.service";
export default function Profile() {
  return (
    <>
      <button onClick={() => authService.logout()}>Logout</button>
    </>
  );
}
