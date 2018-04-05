# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Tasktracker3.Repo.insert!(%Tasktracker3.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
defmodule Seeds do
    alias Tasktracker3.Repo
    alias Tasktracker3.Users.User
    alias Tasktracker3.Tasks.Task
  
    def run do
      p = Comeonin.Argon2.hashpwsalt("password1")
      Repo.delete_all(User)
      a = Repo.insert!(%User{ name: "abhishek", email: "abhishekahuja02@gmail.com", password_hash: p })
      b = Repo.insert!(%User{ name: "shipra", email: "shipravalecha65@gmail.com", password_hash: p })
      c = Repo.insert!(%User{ name: "carol", email: "someEmail@gmail.com", password_hash: p })
      d = Repo.insert!(%User{ name: "dave", email: "someotherEmail@gmail.com", password_hash: p})
  
      Repo.delete_all(Task)
      Repo.insert!(%Task{ title: "Task for Abhishek", body: "do this", status: false, createdBy_id: a.id, assignedto_id: c.id, time_taken: 15 })
      Repo.insert!(%Task{ title: "Task for Abhishek", body: "do this", status: false, createdBy_id: b.id, assignedto_id: c.id, time_taken: 15  })
      Repo.insert!(%Task{ title: "Task for Abhishek", body: "do this", status: false, createdBy_id: c.id, assignedto_id: c.id, time_taken: 15 })
      Repo.insert!(%Task{ title: "Task for Abhishek", body: "do this", status: false, createdBy_id: d.id, assignedto_id: c.id, time_taken: 15  })
    end
  end
  
  Seeds.run