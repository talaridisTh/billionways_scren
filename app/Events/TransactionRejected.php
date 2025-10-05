<?php

declare(strict_types=1);

namespace App\Events;

use App\Models\ScanSession;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TransactionRejected implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public ScanSession $session
    ) {}

    public function broadcastOn(): Channel
    {
        return new PrivateChannel('user.' . $this->session->user_id);
    }

    public function broadcastAs(): string
    {
        return 'transaction.rejected';
    }

    public function broadcastWith(): array
    {
        return [
            'session_id' => $this->session->session_id,
            'status' => $this->session->status,
        ];
    }
}
