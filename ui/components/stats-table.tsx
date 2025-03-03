import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatTimeAgo } from "@/lib/utils";
import { Button } from "./ui/button";

function StatsTable({
  data,
  game,
  active,
}: {
  data: any;
  game?: boolean;
  active?: string;
}) {
  if (game) {
    return (
      <>
        <Table>
          <TableHeader>
            <TableRow className="grid w-full grid-cols-3 gap-4 border-b py-2 text-white/100">
              <TableHead className="text-start">Time</TableHead>
              <TableHead className="text-center">User</TableHead>
              <TableHead className="text-end">Guess</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((entry: any, i: number) => (
                <TableRow
                  className="grid w-full grid-cols-3 gap-4 border-0 border-b py-2"
                  key={i}
                >
                  <TableCell className="text-start">
                    {formatTimeAgo(entry.time)}
                  </TableCell>
                  <TableCell className="text-center">{entry.user}</TableCell>
                  <TableCell className="text-end">{entry.guess}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>{"No count yet!"}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </>
    );
  } else {
    // if tasks
    return (
      <>
        <Table>
          <TableHeader>
            <TableRow className="grid w-full grid-cols-3 gap-4 border-b py-2 text-white/100">
              <TableHead className="text-start">Tasks</TableHead>
              <TableHead className="text-center">Points</TableHead>
              <TableHead className="text-end">&nbsp;</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((entry: any, i: number) => (
                <TableRow
                  className="grid w-full grid-cols-3 gap-4 border-0 border-b py-2"
                  key={i}
                >
                  <TableCell className="description text-start">
                    {entry.task}
                  </TableCell>
                  <TableCell className="description text-center">
                    {entry.points}
                  </TableCell>
                  <TableCell className="text-center">
                    {entry.claimed ? (
                      <Button
                        disabled
                        className="muted subtitle w-[120px] rounded-md bg-grey-400 px-2 uppercase text-white/100"
                      >
                        Claimed
                      </Button>
                    ) : (
                      <Button className="subtitle w-[120px] rounded-md bg-white/100 px-2 uppercase text-grey-400 hover:bg-black/100 hover:text-white/100">
                        Claim
                      </Button>
                    )}{" "}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>{"No taskss yet!"}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </>
    );
  }
}

export default StatsTable;
