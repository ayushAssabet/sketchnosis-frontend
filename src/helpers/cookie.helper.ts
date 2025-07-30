import Cookies from "js-cookie";

export const getAccessToken = () => ({
  accessToken: Cookies.get("SKETCHNOSIS_ACCESS_TOKEN"),
  refreshToken: Cookies.get("SKETCHNOSIS_REFRESH_TOKEN"),
});

export const setTokens = (accessToken: string, refreshToken: string) => {
  const domain = process.env.NEXT_PUBLIC_APP_DOMAIN;
  Cookies.set("SKETCHNOSIS_ACCESS_TOKEN", accessToken, {
    // domain,
    expires: 1 / 24,
  });
  Cookies.set("SKETCHNOSIS_REFRESH_TOKEN", refreshToken, {
    // domain,
    expires: 7,
  });
};

export const clearTokens = () => {
  const domain = process.env.NEXT_PUBLIC_APP_DOMAIN;
  Cookies.remove("SKETCHNOSIS_ACCESS_TOKEN", { domain });
  Cookies.remove("SKETCHNOSIS_REFRESH_TOKEN", { domain });
};
