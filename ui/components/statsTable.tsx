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
          <TableRow className="w-full text-white/100 justify-between">
            <TableHead className="w-full">Time</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Guess</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((entry: any, i: number) => (
              <TableRow className="" key={i}>
                <TableCell>{formatTimeAgo(entry.time)}</TableCell>
                <TableCell>{entry.user}</TableCell>
                <TableCell>{entry.guess}</TableCell>
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
