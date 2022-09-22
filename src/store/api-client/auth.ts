import axiosInstance from '.';

export const signIn = async (user_login: string, password: string, source: number) => {
  try {
    const res = await axiosInstance
      .post('/account/login', {
        user_login: user_login,
        password: password,
        source: source
      });
    return res;
  } catch (err) {
    return err.response;
  }
};

export const signOut = async () => {
  const logoutAllSessions = false;
  try {
    const res = await axiosInstance
      .post('/account/logout', {
        logout_all_sessions: logoutAllSessions //true: remove with userId, false: remove with sessionId
      });
    return res;
  } catch (err) {
    return err.response;
  }
};
