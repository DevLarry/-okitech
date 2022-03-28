let add = [];

function addElement(tagName, innerHTML, style = {}, classList = "") {
  let key = document.createElement(tagName);
  classList.split(" ").forEach((e) => key.classList.add(e));
  key.innerHTML = innerHTML;
  style && (key.style = style);

  return key;
}

function addServices() {
  let key = document.getElementById("key").value;
  let value = document.getElementById("value").value;
  key &&
    $("#listed").append(
      addElement(
        "div",
        `<span class="col-4">${key}</span><span class="col-7">${value}</span> <a class="col-1 fa fa-times close"></a>`,
        null,
        "row alert alert-sm p-1 m-0 mb-1 alert-primary"
      )
    );
  add.push({
    key,
    value,
  });

  // add++;
  document.getElementById("key").value = "";
  document.getElementById("value").value = "";
  submit();
  $("a.close").click(close);
}

function close(e) {
  e.preventDefault();
  // e.target.firstChild()
  e.target.parentElement.remove();
  submit();
}

function submit() {
  // e.preventDefault();
  document.getElementById("hidden").value = JSON.stringify(
    [...$(".row.alert.alert-sm")].map((f) => ({
      key: f.firstChild.innerHTML,
      value: [...f.children][1].innerHTML,
    }))
  );
}
