import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DepositButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full rounded-[4px] border-none bg-orange/100 p-2 text-left text-[8px] text-white/100 hover:bg-orange/80 md:text-[14px]"
          variant="outline"
        >
          Deposit
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[700px] gap-2 border-[0.1px] border-white/12 bg-black/100 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="mb-4 text-left text-white/100">
            Deposit
          </DialogTitle>
          <section className="flex w-full flex-row justify-between">
            <div className="title flex items-center justify-start gap-2 text-white/100">
              <div className="flex size-[32px] items-center justify-center rounded-[1px] bg-white/100">
                <img className="size-[13px]" src="/icons/upload.png" alt="" />
              </div>
              <p>{"COIN"}</p>
            </div>
            <div className="title flex items-center justify-start gap-2 text-white/100">
              Available:&nbsp;<span className="text-white/50">{"0.00"}</span>
            </div>
          </section>
        </DialogHeader>
        {/* cut */}
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="Amount" className="sr-only">
              Amount
            </Label>
            <div className="flex items-center justify-center rounded-[4px] border border-white/12">
              <Input
                id="Amount"
                value={0}
                className="h-[48px] appearance-none border-0 p-4 text-white/50 focus:outline-none"
                defaultValue="Min 0.0"
                readOnly
              />
            </div>
            {/* <Input id="Amount" value={0} className="" defaultValue="0x28...sdf4378" readOnly /> */}
          </div>
        </div>
        {/* cut */}
        <section>
          <p className="subtext text-white/50">Network</p>
          <div className="flex h-[48px] items-center rounded-[4px] border border-white/12 p-4 text-white/50">
            <div className="title flex items-center justify-start gap-2 text-white/100">
              <div className="flex size-[32px] items-center justify-center rounded-[1px] bg-white/100">
                <img className="size-[13px]" src="/icons/upload.png" alt="" />
              </div>
              <p className="title">{"NETWORK"}</p>
            </div>
          </div>
        </section>
        {/* cut */}

        <section>
          <p className="subtext text-white/50">
            Current Connected Wallet Addres
          </p>

          <div className="flex items-center space-x-2">
            <div className="flex flex-1 items-center justify-center gap-2 rounded-[4px] border border-white/12">
              <Input
                value={"0x3b684a0f22082866bD1726C8896FB1eaf32c326e"}
                className="subtext h-[48px] appearance-none border-0 border-white/12 p-4 text-white/100 focus:outline-none"
                id="wallet-address"
                defaultValue="Slow (Fee: 0.0 COIN)"
                readOnly
              />
              <Button className="text-white/100">Change</Button>
            </div>
          </div>
        </section>

        <section>
          <p className="subtext text-white/50">Enter Amount</p>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="amount" className="sr-only">
                Enter Amount
              </Label>
              <Input
                id="amount"
                placeholder="Min 0.01"
                className="subtext h-[48px] border-white/12 p-4 text-white/100"
                defaultValue="Slow (Fee: 0.0 COIN)"
                readOnly
              />
            </div>
          </div>
        </section>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              className="h-[50px] w-full bg-white/100 p-4 uppercase text-black/100"
              type="button"
              variant="secondary"
            >
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
