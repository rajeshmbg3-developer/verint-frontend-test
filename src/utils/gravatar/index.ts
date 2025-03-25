import md5 from "md5";

export const getGravatarUrl = (email: string, size: number = 80): string => {
  if (!email) return `/api/placeholder/${size}/${size}`;

  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=mp`;
};
