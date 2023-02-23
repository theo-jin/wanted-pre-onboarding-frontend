// 회원가입 API
export const signup = async (email, password) => {
  try {
    const res = await fetch(
      "https://pre-onboarding-selection-task.shop/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );
    const result = await res.json();
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// 로그인 API
export const signin = async (email, password) => {
  try {
    const res = await fetch(
      "https://pre-onboarding-selection-task.shop/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );
    const result = await res.json();
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
};