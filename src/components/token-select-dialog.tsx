import { Search } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Token } from "./token-list"

interface TokenSelectDialogProps {
  open: boolean
  onClose: () => void
  onSelect: (token: Token) => void
  tokens: Token[]
  selectedToken?: Token
}

export function TokenSelectDialog({ open, onClose, onSelect, tokens, selectedToken }: TokenSelectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 text-white">
        <DialogHeader>
          <DialogTitle>Select a token</DialogTitle>
        </DialogHeader>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by name or paste address"
            className="pl-9 bg-slate-800 border-slate-700 text-white"
          />
        </div>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-1">
            {tokens.map((token) => (
              <button
                key={token.id}
                onClick={() => {
                  onSelect(token)
                  onClose()
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 ${
                  selectedToken?.id === token.id ? "bg-slate-800" : ""
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  {token.symbol.charAt(0)}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium">{token.symbol}</div>
                  <div className="text-sm text-slate-400">{token.name}</div>
                </div>
                {token.balance && (
                  <div className="text-right">
                    <div className="font-medium">{token.balance}</div>
                    <div className="text-sm text-slate-400">Balance</div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

