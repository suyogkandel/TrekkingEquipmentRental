<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Returns extends Model
{
    use HasFactory;
    protected $table = 'returns';
    protected $fillable = [
        'product_id',
        'product_name',
        'user_name',
        'user_id',
        'order_id',
        'returned',
        'return_qty'



    ];
}
