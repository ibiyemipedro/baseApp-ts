export function getWhere(id = 0, email = "", mobileNumber = "") {
  const where = {};
  if (id) {
    where["id"] = id;
  }
  if (email) {
    where["email"] = email;
  }
  if (mobileNumber) {
    where["mobileNumber"] = mobileNumber;
  }
  return where;
}
