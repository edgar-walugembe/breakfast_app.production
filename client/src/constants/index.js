/* eslint-disable no-unused-vars */

//login url
export const baseUrl = "https://breakfast-app-server.onrender.com";

//password urls
export const passwordUrl = "https://breakfast-app-server.onrender.com/Password";
export const setPasswordUrl = `${passwordUrl}/set_password`;
export const resetPasswordUrl = `${passwordUrl}/reset_password`;
export const changePasswordUrl = `${passwordUrl}/change_password`;

//user urls
export const UserUrl =
  "https://breakfast-app-server.onrender.com/Admin/Dashboard/Users";
export const getUserUrl = `${UserUrl}/all`;
export const createUserUrl = `${UserUrl}/createUser`;
export const editUserUrl = `${UserUrl}/editUser`;
export const deleteUserUrl = `${UserUrl}/deleteUser`;

//product urls
/*admin*/
export const PdtUrl_admin =
  "https://breakfast-app-server.onrender.com/Admin/Dashboard/Products";
export const getPdtUrl_admin = `${PdtUrl_admin}/all`;
export const createPdtUrl_admin = `${PdtUrl_admin}/createPdt`;
export const editPdtUrl_admin = `${PdtUrl_admin}/editPdt`;
export const deletePdtUrl_admin = `${PdtUrl_admin}/deletePdt`;

/*user*/
export const PdtUrl_user =
  "https://breakfast-app-server.onrender.com/User/home/Products";
export const getPdtUrl_user = `${PdtUrl_user}/all`;

//order urls
/*admin*/
export const OrderUrl_admin =
  "https://breakfast-app-server.onrender.com/Admin/Dashboard/Orders";
export const getOrderUrl_admin = `${OrderUrl_admin}/all`;

/*user*/
export const OrderUrl_user =
  "https://breakfast-app-server.onrender.com/User/home/Orders";
export const getOrderUrl_user = (userId) =>
  `${OrderUrl_user}/all?userId=${userId}`;
