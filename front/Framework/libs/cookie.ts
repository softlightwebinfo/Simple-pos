export function setCookie(cname, cvalue, exMins) {
    let d = new Date();
    d.setTime(d.getTime() + (exMins * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}