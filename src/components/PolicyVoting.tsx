import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Vote, Users } from 'lucide-react';

interface Policy {
  id: string;
  name: string;
  description: string;
  effect: string;
}

const policies: Policy[] = [
  {
    id: 'tax-cut',
    name: 'Tax Cuts',
    description: 'Reduce capital gains tax',
    effect: 'All players pay 50% less tax',
  },
  {
    id: 'stimulus',
    name: 'Stimulus Package',
    description: 'Government spending boost',
    effect: 'All players receive $200',
  },
  {
    id: 'rate-cut',
    name: 'Interest Rate Cut',
    description: 'Lower borrowing costs',
    effect: 'Stock prices +10% this round',
  },
];

interface PolicyVotingProps {
  round: number;
}

export function PolicyVoting({ round }: PolicyVotingProps) {
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (policyId: string) => {
    setVotes(prev => ({
      ...prev,
      [policyId]: (prev[policyId] || 0) + 1,
    }));
    setHasVoted(true);
  };

  const winningPolicy = Object.keys(votes).reduce((a, b) => 
    (votes[a] || 0) > (votes[b] || 0) ? a : b
  , '');

  return (
    <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="flex items-center gap-2 mb-4">
        <Vote className="w-5 h-5 text-blue-600" />
        <h3>Economic Policy Vote</h3>
        <Badge variant="outline" className="ml-auto">Round {round}</Badge>
      </div>

      <div className="space-y-2">
        {policies.map(policy => (
          <div key={policy.id} className="p-3 bg-white rounded-lg border">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="text-sm mb-1">{policy.name}</h4>
                <p className="text-xs text-gray-600 mb-2">{policy.description}</p>
                <p className="text-xs text-blue-600">📊 {policy.effect}</p>
              </div>
              <Button
                size="sm"
                onClick={() => handleVote(policy.id)}
                disabled={hasVoted}
                variant={votes[policy.id] > 0 ? 'default' : 'outline'}
              >
                {votes[policy.id] || 0} votes
              </Button>
            </div>
          </div>
        ))}
      </div>

      {hasVoted && (
        <div className="mt-4 p-3 bg-green-50 rounded border-l-4 border-green-500">
          <p className="text-sm text-green-700">Vote recorded! Policy will take effect next round.</p>
        </div>
      )}
    </Card>
  );
}
