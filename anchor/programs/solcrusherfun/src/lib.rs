#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod solcrusherfun {
    use super::*;

  pub fn close(_ctx: Context<CloseSolcrusherfun>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.solcrusherfun.count = ctx.accounts.solcrusherfun.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.solcrusherfun.count = ctx.accounts.solcrusherfun.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeSolcrusherfun>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.solcrusherfun.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeSolcrusherfun<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Solcrusherfun::INIT_SPACE,
  payer = payer
  )]
  pub solcrusherfun: Account<'info, Solcrusherfun>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseSolcrusherfun<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub solcrusherfun: Account<'info, Solcrusherfun>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub solcrusherfun: Account<'info, Solcrusherfun>,
}

#[account]
#[derive(InitSpace)]
pub struct Solcrusherfun {
  count: u8,
}
