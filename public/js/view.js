$(document).ready(function () {
  // Getting a reference to the input field where user adds a new burger
  var $newBurgerInput = $("#add-burger");

  // Our new burgers will go inside the burgerContainer
  var $newBurger = $(".new-burger");

  // Our new burgers will go inside the burgerContainer
  var $devouredBurger = $(".devoured-burger");

  // Adding event listeners for deleting, editing, and adding burgers
  $(document).on("click", "button.delete", deleteBurger);
  $(document).on("click", "button.devour", devourBurger);

  $(".create-form").on("submit", insertBurger); 

  // Our initial burgers array
  var burgers = [];
  console.log(JSON.stringify(burgers))

  // Getting burgers from database when page loads
  getBurgers();

  // This function resets the burgers displayed with new burgers from the database
  function initializeRows() {
    var rowsToAdd = [];
    var rowsToAddDevoured = [];
    for (i = 0; i < burgers.length; i++) {
      if (!burgers[i].devoured) {
        $newBurger.empty();
        rowsToAdd.push(createNewRow(burgers[i]));
        console.log('burger ' + JSON.stringify(burgers[i]))
        $newBurger.prepend(rowsToAdd);

      } else if (burgers[i].devoured) {
        $devouredBurger.empty();
        rowsToAddDevoured.push(createDevouredRow(burgers[i]));

        $devouredBurger.prepend(rowsToAddDevoured);
      }
    }
  }

  // This function grabs burgers from the database and updates the view
  function getBurgers() {
    $.get("/api/burgers", function (data) {
      burgers = data;
      initializeRows();
    });
  }

  // This function constructs a burger-item row
  function createNewRow(burger) {
    var $newInputRow = $(
      [
        "<li class='list-group-item burger-item'>",
        "<span>",
        burger.id,
        ". ",
        burger.burger_name,
        " ",
        "<button class='devour btn btn-primary'>Devour</button>",
        "</span>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.devour").data("id", burger.id);
    $newInputRow.data("burger", burger);
    // if (burger.complete) {
    //   $newInputRow.find("span").css("text-decoration", "line-through");
    // }
    return $newInputRow;
  }

  // This function constructs a devoured burger row
  function createDevouredRow(burger) {
    var $newInputRow = $(
      [
        "<li class='list-group-item burger-item'>",
        "<span>",
        burger.id,
        ". ",
        burger.burger_name,
        " ",
        "<button class='delete btn btn-primary'>Delete</button>",
        "</span>",
        "</li>"
      ].join("")
    );
    $newInputRow.find("button.delete").data("id", burger.id);
    $newInputRow.data("burger", burger);
    return $newInputRow;
  }


  // This function inserts a new burger into our database and then updates the view
  function insertBurger(event) {
    event.preventDefault();
    var burger = {
      burger_name: $("#add-burger").val().trim(),
      devoured: false
    };
    console.log('new burger ' + $newBurgerInput.val().trim());

    $.post("/api/burgers", burger, getBurgers);
    $newBurgerInput.val("");
  }

  function devourBurger(event) {
    event.preventDefault();
    var id = $(this).data("id");
    var newDevouredState = {
      id: id,
      devoured: true
    }
    $.ajax({
      method: "PUT",
      data: newDevouredState,
      url: "/api/burgers/"
    }).then(getBurgers, location.reload())

  }

  // This function deletes a burger when the user clicks the delete button
  function deleteBurger(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/burgers/" + id
    }).then(getBurgers, location.reload());
  }

});