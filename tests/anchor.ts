i  // Configure the client to use the local cluster
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.TodoProgram as anchor.Program<TodoProgram>;
  
mport * as anchor from "@coral-xyz/anchor";
import type { TodoProgram } from "../target/types/todo_program";
