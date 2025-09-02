use anchor_lang::prelude::*;

// This is your program's public key and it will update
// automatically when you build the project.

//my wallet public key= GXMFbdhn1NE6quAzEKi1n7qmkEXvmwcbw6ZTENqjzHG8

declare_id!("BeXYZ29Pc4HWrcSNJBes55o9y3fKKKVCjzp1UhYkLCss");

#[program]
pub mod todo_program {
    use super::*;

    pub fn create_todo(ctx: Context<TodoContext>, title: String, task: String) -> Result<()> {
        let todo_account = &mut ctx.accounts.todo_account;

        todo_account.title = title;
        todo_account.task = task;

        msg!("✅ New todo created!");
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(title: String)]
pub struct TodoContext<'info> {
    #[account(
    init_if_needed,
    payer = signer,
    space = 8 + 266,
    seeds = [b"todo", signer.key().as_ref(),title.as_bytes()],
    bump
    )]
    pub todo_account: Account<'info, Todo>,

    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

//This is a single Account Structs
#[account]
pub struct Todo {
    title: String,
    task: String,
}
