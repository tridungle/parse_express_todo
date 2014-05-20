$(document).on("ready", function(){
  attachEventHandlers()
  getTasks()
})

function getTasks(){
  var Task = Parse.Object.extend("Task")
  var allTasks = new Parse.Query(Task)

  allTasks.descending("createdAt")

  allTasks.find({
    success: function(results){
      $("#task-list").empty()

      $.each(results, function(index, task){
        $("#task-list").append("<li>" + task.attributes.description + "</li>")
      })
    },
    error: function(error){
      console.log(error.message)
    }
  })
}

function createTask(){
  var Task = Parse.Object.extend("Task");
  var task = new Task();

  var description = $("#task-description-field").val()

  task.set("description", description)
  task.set("complete", false)

  task.save(null, {
    success: function(){
      console.log("Task Created")
    },
    error: function(post, error){
      console.log(error.message)
    }
  })

  getTasks()
}

function attachEventHandlers(){
  $("#create-task-form").on("submit", function(event){
    event.preventDefault()
    createTask()
  })
}