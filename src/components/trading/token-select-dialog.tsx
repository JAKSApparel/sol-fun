"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"
import { useState } from "react"
import type { Token } from "./token-list"

type TokenSelectDialogProps = {
  open: boolean
  onClose: () => void
  onSelect: (token: Token) => void
  tokens: Token[]
  selectedToken: Token
}

export function TokenSelectDialog({
  open,
  onClose,
  onSelect,
  tokens,
  selectedToken,
}: TokenSelectDialogProps) {
  const [search, setSearch] = useState("")

  const filteredTokens = tokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(search.toLowerCase()) ||
      token.name.toLowerCase().includes(search.toLowerCase()) ||
      token.address.toLowerCase() === search.toLowerCase()
  )

  const handleSelect = (token: Token) => {
    onSelect(token)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle>Select Token</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by name or paste address"
            className="pl-9 bg-slate-800 border-slate-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-2">
            {filteredTokens.map((token) => (
              <button
                key={token.address}
                onClick={() => handleSelect(token)}
                className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors ${
                  token.address === selectedToken.address ? "bg-slate-800" : ""
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  {token.logoURI ? (
                    <img
                      src={token.logoURI}
                      alt={token.symbol}
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    token.symbol.charAt(0)
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium">{token.symbol}</div>
                  <div className="text-sm text-slate-400">{token.name}</div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

