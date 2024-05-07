export const checkedLoggedIn = (userDetails, navigate) => {
  if (!userDetails) {
    navigate("/logout");
  }
};
