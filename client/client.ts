import * as web3 from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { TodoProgram } from "../target/types/todo_program";import type { TodoProgram } from "../target/types/todo_program";

// Configure the client to use the local cluster
anchor.setProvider(anchor.AnchorProvider.env());

const program = anchor.workspace.TodoProgram as anchor.Program<TodoProgram>;



const main = async () => {
  // Load provider from Playground environment
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  // Load program
  const program = anchor.workspace.TodoProgram as Program<TodoProgram>;

  // Use the Playground wallet as signer
  const signer = provider.wallet as anchor.Wallet;

  // Example todo
  const title = "lesgoo";
  const task = "try anchor PDA";

  // Derive PDA using same seeds as in Rust
  const [todoPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("todo"),
      signer.publicKey.toBuffer(),
      Buffer.from(title),
    ],
    program.programId
  );

  console.log("📝 Derived PDA:", todoPda.toBase58());

  // Call instruction
  await program.methods
    .createTodo(title, task)
    .accounts({
      todoAccount: todoPda,
      signer: signer.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();

  console.log("✅ Transaction successful!");

  // Fetch back the todo data
  const todoAccount = await program.account.todo.fetch(todoPda);
  console.log("📦 Stored Todo:", todoAccount);
};

main().catch((err) => {
  console.error(err);
});
