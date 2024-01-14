export const REGEXP = {
  email:
    /^[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*|.[a-zA-Z]{2,3}$/,
  password: !/^[a-z0-9]+$/,
  nickName: /^[a-zA-Z0-9]$/,
  phone: /^[0-9]+${,11}/,
  region: /^[ㄱ-ㅣ가-힣]+$/,
  postTitle: /^[a-zA-Z0-9ㄱ-ㅣ가-힣]+$/,
};
