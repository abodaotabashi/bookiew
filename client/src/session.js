const aktiveUser = new Array();
export function setUser (userID, email, firstname, surname, password, gender, birthdate, profilePhoto) {
    aktiveUser.push({userID, email, firstname, surname, password, gender, birthdate, profilePhoto});
}
export function getUser () {
    return aktiveUser[0];
}