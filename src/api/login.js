import request from "@/utils/request";
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  };
  return request({
    url: "/login",
    method: "post",
    data: data
  });
}
export function getInfo() {
  return request({
    url: "/getInfo",
    method: "get"
  });
}
export function logout() {
  return request({
    url: "/logout",
    method: "post"
  });
}
export function getCodeImg() {
  return request({
    url: "/captchaImage",
    method: "get"
  });
}
