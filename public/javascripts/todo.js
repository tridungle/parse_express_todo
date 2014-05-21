$(document).on("ready", function(){
  getTasks(attachEventHandlers)
})

function getTasks(callBack){
  var Task = Parse.Object.extend("Task")
  var allTasks = new Parse.Query(Task)

  allTasks.descending("createdAt")

  allTasks.find({
    success: function(results){
      $("#task-list").empty()

      $.each(results, function(index, task){
        if (task.attributes.complete === false){
          var taskTemplate = new EJS({ url: "/partials/task.ejs" }).render({description: task.attributes.description, complete: task.attributes.complete, id: index})
          $("#task-list").append(taskTemplate)
        }
      })

      callBack()
    },
    error: function(error){
      console.log(error.message)
    }
  })
}

function createTask(){
  var Task = Parse.Object.extend("Task");
  var description = $("#task-description-field").val()

  var query = new Parse.Query(Task)

  query.equalTo("description", description)
  query.find({
    success: function(results){
      if (results.length > 0){
        errorHandler.showError("You've already completed that task.")
      }
      else {
        var task = new Task()

        task.set("description", description)
        task.set("complete", false)
        task.save(null,{
          success: function(){
            getTasks(attachEventHandlers)
          }
        })
      }
    },
    error: function(error){
      error.messages
    }
  })
}

function deleteTask(task_to_delete){
  var Task = Parse.Object.extend("Task")
  var query = new Parse.Query(Task)

  query.equalTo("description", task_to_delete.textContent.trim())
  query.find({
    success: function(results){
      var task = results[0]
      task.set("complete", true)
      task.save()
      console.log("updated")
    }
  })
  task_to_delete.remove()
}

var errorHandler = {
  showError: function(message){
    $("#error-messages").append(message)
  },

  clearError: function(){
    $("#error-messages").empty()
  }
}

function attachEventHandlers(){
  $(".delete-task").on("click", function(event){
    event.preventDefault()
    deleteTask(this.parentNode)
  })

  $("#create-task-form").unbind("submit").bind("submit", function(){
    errorHandler.clearError()
    event.preventDefault()
    createTask()
  })
}