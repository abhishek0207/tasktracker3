defmodule Tasktracker3.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string
      add :body, :text
      add :status, :boolean, default: false, null: false
      add :time_taken, :integer
      add :createdBy_id, references(:users, on_delete: :nothing)
      add :assignedto_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:tasks, [:createdBy_id])
    create index(:tasks, [:assignedto_id])
  end
end
