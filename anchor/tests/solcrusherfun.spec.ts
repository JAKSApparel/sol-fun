import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Solcrusherfun} from '../target/types/solcrusherfun'

describe('solcrusherfun', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Solcrusherfun as Program<Solcrusherfun>

  const solcrusherfunKeypair = Keypair.generate()

  it('Initialize Solcrusherfun', async () => {
    await program.methods
      .initialize()
      .accounts({
        solcrusherfun: solcrusherfunKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([solcrusherfunKeypair])
      .rpc()

    const currentCount = await program.account.solcrusherfun.fetch(solcrusherfunKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Solcrusherfun', async () => {
    await program.methods.increment().accounts({ solcrusherfun: solcrusherfunKeypair.publicKey }).rpc()

    const currentCount = await program.account.solcrusherfun.fetch(solcrusherfunKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Solcrusherfun Again', async () => {
    await program.methods.increment().accounts({ solcrusherfun: solcrusherfunKeypair.publicKey }).rpc()

    const currentCount = await program.account.solcrusherfun.fetch(solcrusherfunKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Solcrusherfun', async () => {
    await program.methods.decrement().accounts({ solcrusherfun: solcrusherfunKeypair.publicKey }).rpc()

    const currentCount = await program.account.solcrusherfun.fetch(solcrusherfunKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set solcrusherfun value', async () => {
    await program.methods.set(42).accounts({ solcrusherfun: solcrusherfunKeypair.publicKey }).rpc()

    const currentCount = await program.account.solcrusherfun.fetch(solcrusherfunKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the solcrusherfun account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        solcrusherfun: solcrusherfunKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.solcrusherfun.fetchNullable(solcrusherfunKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
