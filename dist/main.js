let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);
const clip__container = document.querySelector(".clip");
const close__clip__container = document.querySelector("a.close");

const patterns = {
  username: /^[a-z]*\d*$/i,
  password: /^[\w@-]{8,20}$/,
};

let username = id("username"),
  email = id("email"),
  password = id("password"),
  form = id("form"),
  custom__address = id("IP2"),
  btn2 = id("btn2");
(errorMsg = classes("error")),
  (successIcon = classes("success-icon")),
  (failureIcon = classes("failure-icon")),
  (displayUserName = id("displayUserName"));

let engine = (id, serial, message, regEx) => {
  if (id.value.trim() === "" || regEx.test(id.value) === false) {
    errorMsg[serial].innerHTML = message;
    id.style.border = "1px solid red";

    // icons
    failureIcon[serial].style.opacity = "1";
    successIcon[serial].style.opacity = "0";

    throw Error;
  } else {
    errorMsg[serial].innerHTML = "";
    id.style.border = "1px solid green";

    // icons
    failureIcon[serial].style.opacity = "0";
    successIcon[serial].style.opacity = "1";
  }
};

// Get User IP Address
const getUserIP = () => {
  return fetch("http://ip-api.com/json/", {})
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((data) => {
      return Promise.resolve(data.query);
    })
    .catch((err) => console.log({ err }));
};

// Say Hello in Native Language
const sayHello = async (userIP) => {
  return await fetch(`https://fourtonfish.com/hellosalut/?ip=${userIP}`, {})
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((data) => {
      return data.hello;
    });
};

// Open Display Container
const openDisplay = async () => {
  // Define message variable
  let message = ""
  // Get Users name
  const user = username.value;

  // Retrieve User IP address
  let IPaddress = await getUserIP();

  // Get Hello message
  if (custom__address.value !== "") {
    message += await sayHello(custom__address.value);
  } else {
    message += await sayHello(IPaddress);
  }
  // let message = await sayHello(IPaddress);
  // console.log(message);
  // Display username
  displayUserName.innerHTML = `${message} ${user}`;

  // Open display block
  clip__container.classList.add("show");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  engine(
    username,
    0,
    "Username cannot be blank",
    patterns[username.attributes.name.value]
  );
  engine(
    password,
    1,
    "Password cannot be blank",
    patterns[password.attributes.name.value]
  );
  openDisplay();
});

// btn2.addEventListener("click", async (e) => {
//   e.preventDefault();

//   newIP = custom__address.value;
//   message = await sayHello(newIP);

//   displayUserName.innerHTML = `${message} ${username.value}`;
// });

close__clip__container.addEventListener("click", (e) => {
  if (clip__container.classList.contains("show")) {
    clip__container.classList.remove("show");
  }
});
