function getCookie(name) {
  var matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

let session = getCookie("timeStamp") ? "old" : "new";
console.log(session);

/*
* WHEEL
* */

const next = arr => arr.splice(-1).concat(arr);

let wheel =
  session === "old" ? next(JSON.parse(`[${getCookie("wheel")}]`)) : [1, 0, 0];

setCookie("wheel", wheel);

console.log(wheel); // <--

//

setInterval(function() {
  let date = new Date();
  const minutes = 0.1;
  date.setTime(date.getTime() + minutes * 60 * 1000);
  setCookie("timeStamp", "_", {
    expires: date
  });
}, 1000);
