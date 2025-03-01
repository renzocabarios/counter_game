import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatTimeAgo } from "@/lib/utils";

function StatsTable({ data }: { data: any }) {
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
}

export default StatsTable;
