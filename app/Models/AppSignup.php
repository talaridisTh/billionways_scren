<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppSignup extends Model
{
    protected $fillable = [
        'identifier',
        'method',
        'platform',
        'ts',
        'ip',
        'user_agent',
    ];

    protected $casts = [
        'ts' => 'datetime',
    ];
}
