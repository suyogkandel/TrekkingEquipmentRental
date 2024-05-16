<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Orderitems;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();
        // $orders = Order::where('returned', '=', 0)->get();
        return response()->json([
            'status' => 200,
            'orders' => $orders,
        ]);
    }

    public function viewitems($orderId)
{
    // Retrieve order items from the database using the order ID
    $orderItems = Orderitems::where('order_id', $orderId)
    ->join('products', 'orderitems.product_id', '=', 'products.id')
    ->select('orderitems.*', 'products.name as product_name')
    ->get();

    // Return the order items as a JSON response
    return response()->json([
        'status' => 200,
        'data' => [
            'orderItems' => $orderItems
        ]
    ]);
}

public function viewmyorders()
{
    if(auth('sanctum')->check())
    {
        $user_id = auth('sanctum')->user()->id;
        $orderitems = Order::where('user_id', $user_id)
            ->where('returned', '=', 0)
            ->join('users', 'orders.user_id', '=', 'users.id')
            ->join('orderitems', 'orders.id', '=', 'orderitems.order_id')
            ->join('products', 'orderitems.product_id', '=', 'products.id')
            ->select('orders.*', 'users.name as user_name', 'orderitems.qty as return_qty', 'products.id as product_id', 'products.name as product_name', 'products.image as product_image')
            ->get();
        
        return response()->json([
            'status' => 200,
            'orders' => $orderitems,
        ]);
    }
    else
    {
        return response()->json([
            'status' => 401,
            'message' => 'Login to View My Orders Data',
        ]);
    }
}

// public function viewmyorders()
// {
//     if (auth('sanctum')->check())
//     {
//         $user_id = auth('sanctum')->user()->id;
        
//         // Assuming there's a column named "return" in the "orders" table
//         $ordersWithReturn = Order::where('user_id', $user_id)
//             ->where('returned', '=', 0)
//             ->join('users', 'orders.user_id', '=', 'users.id')
//             ->join('orderitems', 'orders.id', '=', 'orderitems.order_id')
//             ->join('products', 'orderitems.product_id', '=', 'products.id')
//             ->select('orders.*', 'users.name as user_name', 'products.id as product_id', 'products.name as product_name', 'products.image as product_image')
//             ->get();

//         if ($ordersWithReturn->isEmpty()) {
//             return response()->json([
//                 'status' => 200,
//                 'message' => 'No orders with returns found for the user.',
//             ]);
//         }
        
//         return response()->json([
//             'status' => 200,
//             'orders' => $ordersWithReturn,
//         ]);
//     }
//     else
//     {
//         return response()->json([
//             'status' => 401,
//             'message' => 'Login to View My Orders Data',
//         ]);
//     }
// }

 
}
