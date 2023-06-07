function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}
const user = getUser();
export default user;
