$(document).on("ready", function(){
  attachEventHandlers()
  getTasks()
})

function createTask(){
  var Task = Parse.Object.extend("Task");
  var task = new Task();

  var description = $("#task-description-field").val()

  task.set("description", description)
  task.set("complete", false)

  task.save(null, {
    success: function(){
      console.log("Success")
    },
    error: function(post, error){
      console.log(error.message)
    }
  })
}

function attachEventHandlers(){
  $("#create-task-form").on("submit", function(event){
    event.preventDefault()
    createTask()
  })
}