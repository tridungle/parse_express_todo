$(document).on("ready", function(){
  getTasks(attachEventHandlers)
})

function getTasks(callback){
  var Task = Parse.Object.extend("Task")
  var allTasks = new Parse.Query(Task)

  allTasks.descending("createdAt")

  allTasks.find({
    success: function(results){
      $("#task-list").empty()

      $.each(results, function(index, task){
        if (task.attributes.complete === false){
          var taskTemplate = new EJS({ url: "/partials/_task.ejs" }).render({description: task.attributes.description, complete: task.attributes.complete, id: index})
          $("#task-list").append(taskTemplate)
        }
      })

      callback()
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
      getTasks()
    },
    error: function(post, error){
      console.log(error.message)
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

function attachEventHandlers(){
  $(".delete-task").on("click", function(event){
    event.preventDefault()
    deleteTask(this.parentNode)
  })

  $("#create-task-form").on("submit", function(event){
    event.preventDefault()
    createTask()
  })
}