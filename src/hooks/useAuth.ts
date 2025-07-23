export function useAuth() {
  const login = async (email: string, password: string) => {

    console.log("Logging in with", email, password);
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Login successful");
        resolve(true);
      }, 1000);
    });
  };

  const logout = async () => {
    console.log("Logging out");
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Logout successful");
        resolve(true);
      }, 1000);
    });
  };

  const getLoggedInUser = () => {
    // Simulate fetching logged-in user data
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: "123",
          email: "teste@example.com",
          name: "Test User",
        };
        console.log("Fetched logged-in user:", user);
        resolve(user);
      }, 1000);
    });
  };

  const isLoggedIn = () => {
    // Simulate checking if user is logged in
    return new Promise((resolve) => {
      setTimeout(() => {
        const loggedIn = true; // Simulate a logged-in state
        console.log("User is logged in:", loggedIn);
        resolve(loggedIn);
      }, 1000);
    });
  };

  return {
    login,
    logout,
    getLoggedInUser,
    isLoggedIn,
  };
}
