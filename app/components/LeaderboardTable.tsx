
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Award, TrendingUp, Users } from "lucide-react";

interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  points: number;
  reviews: number;
  earnings: number;
}

interface LeaderboardTableProps {
  users: LeaderboardUser[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ users }) => {
  return (
    <div className="rounded-lg border border-border/40 overflow-hidden">
      <Table>
        <TableHeader className="bg-secondary">
          <TableRow>
            <TableHead className="w-12 text-tellnearn-yellow">Rank</TableHead>
            <TableHead className="text-tellnearn-yellow">User</TableHead>
            <TableHead className="text-tellnearn-yellow">
              <div className="flex items-center gap-1">
                <Award size={16} />
                <span>Points</span>
              </div>
            </TableHead>
            <TableHead className="text-tellnearn-yellow hidden md:table-cell">
              <div className="flex items-center gap-1">
                <Users size={16} />
                <span>Reviews</span>
              </div>
            </TableHead>
            <TableHead className="text-right text-tellnearn-yellow">
              <div className="flex items-center gap-1 justify-end">
                <TrendingUp size={16} />
                <span>Earnings</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="bg-card hover:bg-secondary/80">
              <TableCell className="font-medium">
                {user.rank === 1 && <span className="text-tellnearn-yellow-500">🏆</span>}
                {user.rank === 2 && <span className="text-gray-400">🥈</span>}
                {user.rank === 3 && <span className="text-amber-700">🥉</span>}
                {user.rank > 3 && <span>{user.rank}</span>}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                      height={100}
                      width={100}
                    />
                  </div>
                  <div>
                    <div className="font-medium text-white">{user.name}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-semibold">{user.points}</TableCell>
              <TableCell className="hidden md:table-cell">{user.reviews}</TableCell>
              <TableCell className="text-right font-semibold text-tellnearn-yellow">
                ${user.earnings}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderboardTable;
