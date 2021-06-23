import moment from "moment";

function currentDate() {
  const today = new Date();
  let month = today.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = today.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  return `${today.getFullYear()}-${month}-${day}`;
}

export function infoMessage(message) {
  this.$notify({
    text: message,
    type: "info",
    duration: 3000,
  });
}

export function errorMessage(message) {
  this.$notify({
    text: message,
    type: "error",
    duration: 3000,
  });
}

export function formatEventUbication(event) {
  let direction = "";
  if (event.latitude.length > 0 && event.longitude.length > 0) {

    if (event.direction.length > 0) {
      direction = `${event.direction}, `;
    }

    direction += `${event.city}, ${event.province}, ${event.country}`;

    if (event.postalCode) {
      direction += `, ${event.postalCode}`;
    }

  }

  return direction;
}

export function getCurrentDate() {
  return currentDate();
}

export function getMinTime(date) {
  let minTime = "";
  const minimumDate = currentDate().split("-");
  const reversedMinimumDate = `${minimumDate[2]}-${minimumDate[1]}-${minimumDate[0]}`;
  if (date && date === reversedMinimumDate) {
    const now = moment();
    minTime = `${now.hour()}:${now.minutes()}`;
  }
  return minTime;
}

export function isPasswordValid(password) {
  const containsUppercase = /[A-Z]/.test(password);
  const containsLowercase = /[a-z]/.test(password);
  const containsNumber = /[0-9]/.test(password);
  const containsSpecial = /[#?!@$%^&*-]/.test(password);
  return (
    containsUppercase &&
    containsLowercase &&
    containsNumber &&
    containsSpecial
  );
}



