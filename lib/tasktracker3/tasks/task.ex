defmodule Tasktracker3.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :body, :string
    field :status, :boolean, default: false
    field :time_taken, :integer
    field :title, :string
    belongs_to :creator, Tasktracker3.Users.User, foreign_key: :createdBy_id
    belongs_to :assigner, Tasktracker3.Users.User, foreign_key: :assignedto_id
    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :body, :status, :time_taken, :createdBy_id, :assignedto_id ])
    |> validate_required([:title, :body, :status, :time_taken, :createdBy_id,  :assignedto_id ])
  end
end
